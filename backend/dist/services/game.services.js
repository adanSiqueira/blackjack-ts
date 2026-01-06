"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameService = exports.GameService = void 0;
const game_store_1 = require("../state/game.store");
/**
 * GameService
 *
 * Application-level service that orchestrates:
 * - Game lifecycle
 * - Player actions
 * - State persistence (in-memory store)
 *
 * This layer contains business flow logic,
 * but no transport logic (HTTP / WS).
 */
class GameService {
    /**
     * Creates a new game session.
     *
     * @param bet Initial bet amount
     * @returns GameSession
     */
    createGame(bet) {
        const session = game_store_1.gameStore.createGame();
        session.game.start(bet);
        return session;
    }
    /**
     * Retrieves an existing game session.
     *
     * @param id Game session ID
     */
    getGame(id) {
        const session = game_store_1.gameStore.getGame(id);
        if (!session) {
            throw new Error('Game not found');
        }
        return session;
    }
    /**
     * Player requests a HIT.
     *
     * @param id Game session ID
     */
    hit(id) {
        const session = this.getGame(id);
        if (session.status !== 'active') {
            throw new Error('Game already finished');
        }
        session.game.hitPlayer();
        if (session.game.player.hand.value >= 21) {
            session.status = 'finished';
        }
        return session;
    }
    /**
     * Player requests STAND.
     *
     * @param id Game session ID
     */
    stand(id) {
        const session = this.getGame(id);
        if (session.status !== 'active') {
            throw new Error('Game already finished');
        }
        session.game.stand();
        session.status = 'finished';
        return session;
    }
}
exports.GameService = GameService;
/**
 * Singleton service instance
 *
 * This keeps game behavior consistent
 * across REST and WebSocket usage.
 */
exports.gameService = new GameService();
