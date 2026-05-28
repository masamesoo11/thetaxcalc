const { createServer } = require('http');
const next = require('next');

const app = next({ dev: true });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  server.listen(3000, '0.0.0.0', () => {
    console.log('> Ready on http://0.0.0.0:3000');
  });

  // Reasonable keep-alive settings
  server.keepAliveTimeout = 5000;
  server.headersTimeout = 6000;
});
