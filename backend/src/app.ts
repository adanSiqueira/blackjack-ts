import express from 'express';
import cors from 'cors';

import healthRoutes from './api/routes/health.routes';
import gameRoutes from './api/routes/game.routes';
import { errorMiddleware } from './api/middleware/error.middleware';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/health', healthRoutes);
app.use('/api/game', gameRoutes);

app.use(errorMiddleware);

export default app;
