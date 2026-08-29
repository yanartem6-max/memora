const http = require('http');
const { connectDB, query } = require('./db');

const PORT = process.env.PORT || 8000;
const HOST = '0.0.0.0';

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
        telegram_auth: '/api/auth/telegram'
      }
    }));
  }
  // API endpoints
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
      req.on('end', () => {
        try {
          const data = JSON.parse(body);
          res.end(JSON.stringify({ 
            success: true, 
            message: 'Telegram auth received',
            data: data
          }));
        } catch (e) {
          res.end(JSON.stringify({ success: false, error: 'Invalid JSON' }));
        }
      });
    } else {
      res.end(JSON.stringify({ 
        success: true, 
        message: 'POST to this endpoint to authenticate'
      }));
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
