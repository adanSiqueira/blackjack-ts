import express from 'express';
import cors from 'cors';
import path from 'path';

import healthRoutes from './api/routes/health.routes';
import gameRoutes from './api/routes/game.routes';
import { errorMiddleware } from './api/middleware/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());

/**
 * API routes
 * These must come BEFORE the frontend static handler
 */
app.use('/health', healthRoutes);
app.use('/api/game', gameRoutes);

/**
 * Frontend (Vite build) serving
 *
 * This allows the backend to serve the React SPA in production.
 * React Router requires a catch-all route that returns index.html.
 */
const frontendDistPath = path.resolve(
  __dirname,
  '../../frontend/dist'
);

// Serve static assets (JS, CSS, images)
app.use(express.static(frontendDistPath));

// SPA fallback (React Router)
app.get('./*', (_req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

/**
 * Global error handler
 * Must be registered AFTER routes
 */
app.use(errorMiddleware);

export default app;
