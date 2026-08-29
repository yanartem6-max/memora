const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { connectDB, query } = require('./db');

const PORT = process.env.PORT || 8000;
const HOST = '0.0.0.0';
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8202187552:AAEv9IK-_wXcB1NVBFmFqZWgaoKUXSY5-ZY';

// Функция отправки сообщений в Telegram
function sendTelegramMessage(chatId, text, options = {}) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'HTML',
      ...options
    });
    
    const req = https.request({
      hostname: 'api.telegram.org',
      path: `/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(JSON.parse(body)));
    });
    
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// Запускаем подключение к БД
connectDB().catch(err => console.error('DB init failed:', err));

// Fallback хранилище в памяти
let tokens = [];
let traders = [];
let users = [];

const server = http.createServer((req, res) => {
  console.log(`Request: ${req.method} ${req.url}`);
  
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
    return;
  }
  
  res.writeHead(200, headers);
  
  // Routes
  if (req.url === '/health' || req.url === '/health/') {
    res.end(JSON.stringify({ status: 'ok', port: PORT, timestamp: new Date().toISOString() }));
  } 
  else if (req.url === '/' || req.url === '') {
    res.end(JSON.stringify({ 
      name: 'MEMORA API', 
      version: '1.0.0',
      status: 'running',
      endpoints: {
        health: '/health',
        tokens: '/api/tokens',
        traders: '/api/traders',
        users: '/api/users',
        telegram_auth: '/api/auth/telegram',
        telegram_webhook: '/webhook/telegram',
        mini_app: '/app'
      },
      webhook_url: 'https://memora-iuue.onrender.com/webhook/telegram'
    }));
  }
  // Telegram Mini App UI
  else if (req.url === '/app' || req.url === '/app/') {
    const filePath = path.join(__dirname, 'public', 'app.html');
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('App not found');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      }
    });
    return;
  }
  else if (req.url === '/api/tokens' || req.url === '/api/tokens/') {
    try {
      const result = await query('SELECT * FROM tokens ORDER BY created_at DESC LIMIT 100');
      res.end(JSON.stringify({ 
        success: true, 
        data: result.rows,
        count: result.rows.length
      }));
    } catch (err) {
      res.end(JSON.stringify({ 
        success: true, 
        data: tokens,
        message: 'Using in-memory storage'
      }));
    }
  }
  else if (req.url === '/api/traders' || req.url === '/api/traders/') {
    try {
      const result = await query('SELECT * FROM traders ORDER BY total_profit DESC LIMIT 100');
      res.end(JSON.stringify({ 
        success: true, 
        data: result.rows,
        count: result.rows.length
      }));
    } catch (err) {
      res.end(JSON.stringify({ 
        success: true, 
        data: traders,
        message: 'Using in-memory storage'
      }));
    }
  }
  else if (req.url === '/api/users' || req.url === '/api/users/') {
    try {
      const result = await query('SELECT id, telegram_id, username, first_name, created_at FROM users ORDER BY created_at DESC LIMIT 100');
      res.end(JSON.stringify({ 
        success: true, 
        data: result.rows,
        count: result.rows.length
      }));
    } catch (err) {
      res.end(JSON.stringify({ 
        success: true, 
        data: users,
        message: 'Using in-memory storage'
      }));
    }
  }
  else if (req.url === '/api/auth/telegram' || req.url === '/api/auth/telegram/') {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk.toString(); });
      req.on('end', async () => {
        try {
          const data = JSON.parse(body);
          // Сохраняем пользователя в БД
          try {
            await query(
              `INSERT INTO users (telegram_id, username, first_name, last_name) 
               VALUES ($1, $2, $3, $4) 
               ON CONFLICT (telegram_id) DO UPDATE 
               SET username = $2, first_name = $3, last_name = $4
               RETURNING id`,
              [data.id, data.username, data.first_name, data.last_name]
            );
          } catch (dbErr) {
            console.log('DB save failed, using memory');
          }
          
          res.end(JSON.stringify({ 
            success: true, 
            message: 'User authenticated',
            user: data
          }));
        } catch (e) {
          res.end(JSON.stringify({ success: false, error: 'Invalid JSON' }));
        }
      });
    } else {
      res.end(JSON.stringify({ 
        success: true, 
        message: 'POST user data to authenticate'
      }));
    }
  }
  // Telegram Bot Webhook
  else if (req.url === '/webhook/telegram' || req.url === '/webhook/telegram/') {
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk.toString(); });
      req.on('end', async () => {
        try {
          const update = JSON.parse(body);
          console.log('Telegram update:', update);
          
          // Обрабатываем сообщения
          if (update.message) {
            const msg = update.message;
            const chatId = msg.chat.id;
            const text = msg.text;
            
            // Команда /start
            if (text === '/start') {
              await sendTelegramMessage(chatId, 
                '🚀 Добро пожаловать в MEMORA!\n\n' +
                'Платформа для отслеживания токенов и топ-трейдеров.\n\n' +
                'Используйте кнопку ниже чтобы открыть приложение.',
                {
                  reply_markup: {
                    inline_keyboard: [[
                      { text: '📱 Открыть MEMORA', web_app: { url: 'https://memora-iuue.onrender.com/app' } }
                    ]]
                  }
                }
              );
            }
            // Команда /help
            else if (text === '/help') {
              await sendTelegramMessage(chatId,
                '📖 Помощь MEMORA:\n\n' +
                '/start - Запустить бота\n' +
                '/help - Показать помощь\n' +
                '/tokens - Список токенов\n' +
                '/traders - Топ трейдеры'
              );
            }
            // Команда /tokens
            else if (text === '/tokens') {
              try {
                const result = await query('SELECT * FROM tokens LIMIT 5');
                let message = '💎 Топ токены:\n\n';
                if (result.rows.length > 0) {
                  result.rows.forEach((token, i) => {
                    message += `${i+1}. ${token.symbol} - $${token.price || 'N/A'}\n`;
                  });
                } else {
                  message += 'Пока нет токенов в базе';
                }
                await sendTelegramMessage(chatId, message);
              } catch (err) {
                await sendTelegramMessage(chatId, 'Ошибка загрузки токенов');
              }
            }
            // Команда /traders
            else if (text === '/traders') {
              try {
                const result = await query('SELECT * FROM traders LIMIT 5');
                let message = '🏆 Топ трейдеры:\n\n';
                if (result.rows.length > 0) {
                  result.rows.forEach((trader, i) => {
                    message += `${i+1}. Прибыль: $${trader.total_profit || 0}\n`;
                  });
                } else {
                  message += 'Пока нет трейдеров в базе';
                }
                await sendTelegramMessage(chatId, message);
              } catch (err) {
                await sendTelegramMessage(chatId, 'Ошибка загрузки трейдеров');
              }
            }
          }
          
          res.end(JSON.stringify({ ok: true }));
        } catch (e) {
          console.error('Webhook error:', e);
          res.end(JSON.stringify({ ok: false }));
        }
      });
    } else {
      res.end(JSON.stringify({ message: 'Telegram webhook endpoint' }));
    }
  }
  else {
    res.writeHead(404, headers);
    res.end(JSON.stringify({ error: 'Not Found', url: req.url }));
  }
});

server.listen(PORT, HOST, () => {
  console.log(`🚀 MEMORA API Server running on ${HOST}:${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 Endpoints:`);
  console.log(`   GET  /health`);
  console.log(`   GET  /api/tokens`);
  console.log(`   GET  /api/traders`);
  console.log(`   POST /api/auth/telegram`);
  console.log(`\n✅ Ready to handle requests...`);
});
