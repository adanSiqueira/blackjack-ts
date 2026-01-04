import { Router } from 'express';

const router = Router();

/**
 * Temporary placeholder route.
 */
router.post('/start', (_req, res) => {
  res.status(200).json({
    message: 'Game started (placeholder)'
  });
});

export default router;
