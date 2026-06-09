const { spawn } = require('child_process');
const http = require('http');

function startServer() {
  console.log('[supervisor] Starting server...');
  const server = spawn('node', ['node_modules/.bin/next', 'dev', '-p', '3000'], {
    cwd: '/home/z/my-project',
    stdio: 'pipe',
    env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=2048' }
  });
  
  server.stdout.on('data', (data) => {
    console.log('[server]', data.toString().trim());
  });
  
  server.stderr.on('data', (data) => {
    console.log('[server-err]', data.toString().trim());
  });
  
  server.on('close', (code) => {
    console.log('[supervisor] Server exited with code', code, '- restarting in 3s...');
    setTimeout(startServer, 3000);
  });
  
  server.on('error', (err) => {
    console.log('[supervisor] Server error:', err.message, '- restarting in 3s...');
    setTimeout(startServer, 3000);
  });
}

startServer();

// Keep the supervisor alive
setInterval(() => {
  // Just a heartbeat to keep the process running
}, 30000);
