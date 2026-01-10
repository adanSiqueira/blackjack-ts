import { Game } from '@blackjack/domain';
import { gameStore, GameSession } from '../state/game.store';

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
export class GameService {
  /**
   * Creates a new game session.
   *
   * @param bet Initial bet amount
   * @returns GameSession
   */
  createGame(bet: number): GameSession {
    const session = gameStore.createGame();

    session.game.start(bet);

    return session;
  }

  /**
   * Retrieves an existing game session.
   *
   * @param id Game session ID
   */
  getGame(id: string): GameSession {
    const session = gameStore.getGame(id);

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
  hit(id: string): GameSession {
  const session = this.getGame(id);

  if (session.status !== 'active') {
    throw new Error('Game already finished');
  }

  if (session.game.hasPlayerReached21()) {
    throw new Error('Player already has 21');
  }

  session.game.hitPlayer();

  if (session.game.isPlayerBust() || session.game.hasPlayerReached21()) {
    session.status = 'finished';
  }

  return session;
  }

  /**
   * Player requests STAND.
   *
   * @param id Game session ID
   */
  stand(id: string): GameSession {
    const session = this.getGame(id);

    if (session.status !== 'active') {
      throw new Error('Game already finished');
    }

    session.game.stand();
    session.status = 'finished';

    return session;
  }
}

/**
 * Singleton service instance
 *
 * This keeps game behavior consistent
 * across REST and WebSocket usage.
 */
export const gameService = new GameService();
