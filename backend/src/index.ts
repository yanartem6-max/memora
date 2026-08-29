const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req: any, res: any) => {
  res.json({ name: 'MEMORA API', status: 'running' });
});

app.get('/health', (req: any, res: any) => {
  res.json({ status: 'ok' });
});

app.get('/api/health', (req: any, res: any) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
