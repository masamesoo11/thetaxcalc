const { createServer } = require('http');
const next = require('next');

const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    // Force connection close after each request
    res.setHeader('Connection', 'close');
    handle(req, res);
  });
  
  server.listen(3000, '0.0.0.0', () => {
    console.log('> Ready on http://0.0.0.0:3000');
  });
  
  // Limit keep-alive connections
  server.keepAliveTimeout = 1000;
  server.headersTimeout = 1500;
});
