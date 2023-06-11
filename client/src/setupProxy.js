const { createProxyMiddleware } = require('http-proxy-middleware');

function setupProxy (app) {
  // using for java servers
  app.use(
    '/inventory',
    createProxyMiddleware({
      target: 'http://localhost:5001',
      changeOrigin: true,
    })
  );
};

module.exports = setupProxy;