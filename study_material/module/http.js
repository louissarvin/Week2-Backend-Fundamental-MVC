const http = require('http');

const server = http.createServer((req, res) => {
  // Routing sederhana
  if (req.url === '/api/users' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify([{ id: 1, name: 'John' }]));
  } else {
    res.writeHead(404);
    res.end('Route not found');
  }
});

server.listen(3000, () => {
  console.log('API server running on port 3000');
});