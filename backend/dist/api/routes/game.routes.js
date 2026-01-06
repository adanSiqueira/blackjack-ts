"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const game_controller_1 = require("../controllers/game.controller");
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
const router = (0, express_1.Router)();
/**
 * Start a new game
 * POST /api/game
 */
router.post('/', game_controller_1.GameController.createGame);
/**
 * Get game state
 * GET /api/game/:id
 */
router.get('/:id', game_controller_1.GameController.getGame);
/**
 * Player hits
 * POST /api/game/:id/hit
 */
router.post('/:id/hit', game_controller_1.GameController.hit);
/**
 * Player stands
 * POST /api/game/:id/stand
 */
router.post('/:id/stand', game_controller_1.GameController.stand);
exports.default = router;
