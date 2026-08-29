const http = require('http');

const PORT = process.env.PORT || 8000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  
  if (req.url === '/health') {
    res.end(JSON.stringify({ status: 'ok' }));
  } else if (req.url === '/') {
    res.end(JSON.stringify({ 
      name: 'MEMORA API', 
      version: '1.0.0',
      status: 'running' 
    }));
  } else {
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
