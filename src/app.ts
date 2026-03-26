import cors from 'cors';
import express from 'express';
import path from 'node:path';

import { errorHandler } from './middleware/error-handler.js';
import { notFound } from './middleware/not-found.js';
import { createApiRouter } from './routes/api.routes.js';

export function createApp() {
  const app = express();

  app.use(express.json({ limit: '1mb' }));
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',').map((s) => s.trim()) : true,
      credentials: false,
    })
  );

  const uploadsDir = path.resolve(process.cwd(), 'uploads');
  app.use('/uploads', express.static(uploadsDir));

  app.use('/api', createApiRouter());

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
