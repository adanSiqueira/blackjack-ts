import { Express } from 'express';

export function registerGameRoutes(app: Express) {
  app.post('/game/start', (_, res) => {
    res.json({ message: 'Game started (stub)' });
  });
}