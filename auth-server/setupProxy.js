const { createProxyMiddleware } = require('http-proxy-middleware');
const { checkAuthenticated } = require('./middlewares/authMiddleware');

function setupProxy (app) {
  app.use(
    '/inventory',
    checkAuthenticated,
    createProxyMiddleware({
      target: 'http://localhost:5001',
      changeOrigin: true,
    })
  );
  
};

module.exports = setupProxy;