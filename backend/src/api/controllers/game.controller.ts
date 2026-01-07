import { Request, Response } from 'express';
import { Game } from '@blackjack/domain';
import { mapGameToState } from '../../mappers/game.mapper';

const games = new Map<string, Game>();

export class GameController {
  static createGame(req: Request, res: Response) {
    const game = new Game();
    const gameId = crypto.randomUUID();

    game.start(100); // Starting with a default bet of 100
    games.set(gameId, game);

    const dto = mapGameToState(game, gameId);

    res.json(dto); // ✅ THIS is what frontend expects
  }

  static getGame(req: Request, res: Response) {
    const game = games.get(req.params.id);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.json(mapGameToState(game, req.params.id));
  }

  static hit(req: Request, res: Response) {
    const game = games.get(req.params.id);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    game.hitPlayer();
    res.json(mapGameToState(game, req.params.id));
  }

  static stand(req: Request, res: Response) {
    const game = games.get(req.params.id);
    if (!game) {
      return res.status(404).json({ error: 'Game not found' });
    }

    game.stand();
    res.json(mapGameToState(game, req.params.id));
  }
}
