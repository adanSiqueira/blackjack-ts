import { Request, Response } from 'express';
import { gameService } from '../../services/game.services';
import { mapGameToState } from '../../mappers/game.mapper';

export class GameController {
  static createGame(req: Request, res: Response) {
    const session = gameService.createGame(100);

    res.json(mapGameToState(session.game, session.id));
  }

  static getGame(req: Request, res: Response) {
    try {
      const session = gameService.getGame(req.params.id);
      res.json(mapGameToState(session.game, session.id));
    } catch (err: any) {
      res.status(404).json({ error: err.message });
    }
  }

  static hit(req: Request, res: Response) {
    try {
      const session = gameService.hit(req.params.id);
      res.json(mapGameToState(session.game, session.id));
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static stand(req: Request, res: Response) {
    try {
      const session = gameService.stand(req.params.id);
      res.json(mapGameToState(session.game, session.id));
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
