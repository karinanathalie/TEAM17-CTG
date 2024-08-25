const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function setupProxy(app) {
  // Custom logging middleware for debugging purposes
  app.use((req, res, next) => {
    next();
  });

  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8000',  // or your actual backend URL
      changeOrigin: true,
      secure: false,
      pathRewrite: { '^/api': '' },  // Rewrites '/api' to ''
    })
  );
};