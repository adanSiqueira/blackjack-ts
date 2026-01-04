import crypto from 'crypto';
import { Game } from '@blackjack/domain';

export type GameSession = {
  id: string;
  game: Game;
  createdAt: Date;
  status: 'active' | 'finished';
};

export class GameStore {
  private games = new Map<string, GameSession>();

  createGame(): GameSession {
    const id = crypto.randomUUID();

    const session: GameSession = {
      id,
      game: new Game(),
      createdAt: new Date(),
      status: 'active'
    };

    this.games.set(id, session);
    return session;
  }

  getGame(id: string): GameSession | undefined {
    return this.games.get(id);
  }

  finishGame(id: string): void {
    const session = this.games.get(id);
    if (!session) return;

    session.status = 'finished';
  }

  deleteGame(id: string): void {
    this.games.delete(id);
  }

  listActiveGames(): GameSession[] {
    return [...this.games.values()].filter(
      g => g.status === 'active'
    );
  }
}

export const gameStore = new GameStore();