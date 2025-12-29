import { Express } from 'express';

export function registerHealthRoutes(app: Express) {
  app.get('/health', (_, res) => {
    res.json({ status: 'ok' });
  });
}