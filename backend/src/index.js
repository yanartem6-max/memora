const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ 
    name: 'MEMORA API', 
    version: '1.0.0',
    status: 'running',
    message: 'Premium Telegram Mini App for Crypto Trading'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/tokens', (req, res) => {
  res.json({ success: true, data: [] });
});

app.get('/api/traders', (req, res) => {
  res.json({ success: true, data: [] });
});

app.get('/api/wallet', (req, res) => {
  res.json({ success: true, data: null });
});

app.post('/api/auth/telegram', (req, res) => {
  res.json({ success: true });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
