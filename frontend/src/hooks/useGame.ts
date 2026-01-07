import { useCallback, useState } from 'react';
import type { GameStateDTO } from '@blackjack/domain';

import {
  createGame as apiCreateGame,
  getGameState,
  hit as apiHit,
  stand as apiStand
} from '../services/api';

/**
 * Orchestrates the Blackjack game state on the frontend.
 *
 * Responsibilities:
 * - Holds the current GameStateDTO
 * - Exposes intent-based actions (create, hit, stand)
 * - Handles loading and error state
 *
 * This hook is the single source of truth for game state in the UI.
 */
export function useGame() {
  const [game, setGame] = useState<GameStateDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Creates a new game session.
   */
  const createGame = useCallback(async () => {
    console.log('[useGame] createGame called');
    setLoading(true);
    setError(null);

    try {
      const newGame = await apiCreateGame();
      console.log('[useGame] game received', newGame);
      setGame(newGame);
    } catch (err) {
      console.error(err);
      setError('Failed to create game');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Refreshes the game state from the backend.
   * Useful after reconnects or WS events later.
   */
  const refreshGame = useCallback(async () => {
    if (!game) return;

    setLoading(true);
    setError(null);

    try {
      const updatedGame = await getGameState(game.gameId);
      setGame(updatedGame);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch game state');
    } finally {
      setLoading(false);
    }
  }, [game]);

  /**
   * Player hits (draws a card).
   */
  const hit = useCallback(async () => {
    if (!game) return;

    setLoading(true);
    setError(null);

    try {
      const updatedGame = await apiHit(game.gameId);
      setGame(updatedGame);
    } catch (err) {
      console.error(err);
      setError('Failed to hit');
    } finally {
      setLoading(false);
    }
  }, [game]);

  /**
   * Player stands (dealer plays).
   */
  const stand = useCallback(async () => {
    if (!game) return;

    setLoading(true);
    setError(null);

    try {
      const updatedGame = await apiStand(game.gameId);
      setGame(updatedGame);
    } catch (err) {
      console.error(err);
      setError('Failed to stand');
    } finally {
      setLoading(false);
    }
  }, [game]);

  return {
    game,
    loading,
    error,
    createGame,
    refreshGame,
    hit,
    stand
  };
}