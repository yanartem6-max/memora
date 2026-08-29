// Скрипт для установки Telegram webhook
const https = require('https');

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8202187552:AAEv9IK-_wXcB1NVBFmFqZWgaoKUXSY5-ZY';
const WEBHOOK_URL = process.env.WEBHOOK_URL || 'https://memora-iuue.onrender.com/webhook/telegram';

function setWebhook() {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook?url=${encodeURIComponent(WEBHOOK_URL)}`;
  
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('✅ Webhook response:', JSON.parse(data));
    });
  }).on('error', (err) => {
    console.error('❌ Webhook error:', err);
  });
}

function getWebhookInfo() {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo`;
  
  https.get(url, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      console.log('📋 Webhook info:', JSON.parse(data));
    });
  }).on('error', (err) => {
    console.error('❌ Error:', err);
  });
}

// Устанавливаем webhook
console.log('🔧 Setting webhook to:', WEBHOOK_URL);
setWebhook();

// Проверяем через 2 секунды
setTimeout(getWebhookInfo, 2000);
