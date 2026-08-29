const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Logging
app.use((req: any, res: any, next: any) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Health endpoint
app.get('/health', (req: any, res: any) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req: any, res: any) => {
  res.json({
    name: 'MEMORA API',
    version: '1.0.0',
    status: 'running',
    message: 'Premium Telegram Mini App for Crypto Trading'
  });
});

// API endpoints
app.get('/api/health', (req: any, res: any) => {
  res.json({ status: 'ok' });
});

app.get('/api/tokens', (req: any, res: any) => {
  res.json({ success: true, data: [] });
});

app.get('/api/traders', (req: any, res: any) => {
  res.json({ success: true, data: [] });
});

app.get('/api/wallet', (req: any, res: any) => {
  res.json({ success: true, data: null });
});

app.post('/api/auth/telegram', (req: any, res: any) => {
  res.json({ success: true });
});

// 404
app.use((req: any, res: any) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err);
  res.status(500).json({ error: 'Server Error' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
