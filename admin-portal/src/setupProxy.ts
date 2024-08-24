import { createProxyMiddleware } from 'http-proxy-middleware';
import { Application, Request, Response, NextFunction } from 'express';

export default function setupProxy(app: Application) {
  // Custom logging middleware for debugging purposes
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`Proxying request: ${req.method} ${req.url}`);
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
}