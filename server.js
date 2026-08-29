const http = require('http');

const PORT = process.env.PORT || 8000;
const HOST = '0.0.0.0';

const server = http.createServer((req, res) => {
  console.log(`Request: ${req.method} ${req.url}`);
  
  res.writeHead(200, { 
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  
  if (req.url === '/health' || req.url === '/health/') {
    res.end(JSON.stringify({ status: 'ok', port: PORT }));
  } else if (req.url === '/' || req.url === '') {
    res.end(JSON.stringify({ 
      name: 'MEMORA API', 
      version: '1.0.0',
      status: 'running',
      port: PORT
    }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found', url: req.url }));
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
