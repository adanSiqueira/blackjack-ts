import axios from 'axios';
import type { GameStateDTO } from '@blackjack/domain';

/**
 * Axios instance configured for the backend API.
 *
 * Why:
 * - Centralizes base URL
 * - Centralizes headers
 * - Easy to replace with mocks or interceptors later
 *
 * IMPORTANT:
 * - Vite exposes env variables via import.meta.env
 * - Only variables prefixed with VITE_ are available
 */

const API_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Creates a new blackjack game session.
 */
export async function createGame(): Promise<GameStateDTO> {
  const response = await apiClient.post<GameStateDTO>('/game');
  return response.data;
}

/**
 * Fetches the current state of a game.
 */
export async function getGameState(gameId: string): Promise<GameStateDTO> {
  const response = await apiClient.get<GameStateDTO>(`/game/${gameId}`);
  return response.data;
}

/**
 * Player hits (draws a card).
 */
export async function hit(gameId: string): Promise<GameStateDTO> {
  const response = await apiClient.post<GameStateDTO>(
    `/game/${gameId}/hit`
  );
  return response.data;
}

/**
 * Player stands (dealer plays).
 */
export async function stand(gameId: string): Promise<GameStateDTO> {
  const response = await apiClient.post<GameStateDTO>(
    `/game/${gameId}/stand`
  );
  return response.data;
}
