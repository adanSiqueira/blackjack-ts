import { Router } from 'express';
import { GameController } from '../controllers/game.controller';

/**
 * Game routes
 *
 * Purpose:
 * - Map HTTP endpoints to controller methods
 * - Keep routing concerns isolated from application logic
 *
 * Mounted at:
 *   /api/game
 */
const router = Router();

/**
 * Start a new game
 * POST /api/game
 */
router.post('/', GameController.createGame);

/**
 * Get game state
 * GET /api/game/:id
 */
router.get('/:id', GameController.getGame);

/**
 * Player hits
 * POST /api/game/:id/hit
 */
router.post('/:id/hit', GameController.hit);

/**
 * Player stands
 * POST /api/game/:id/stand
 */
router.post('/:id/stand', GameController.stand);

export default router;