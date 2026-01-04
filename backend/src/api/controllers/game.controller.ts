import { Request, Response, NextFunction } from 'express';
import { gameService } from '../../services/game.services';

/**
 * GameController
 *
 * HTTP adapter layer between clients and the GameService.
 *
 * Responsibilities:
 * - Parse and validate HTTP input
 * - Call application services
 * - Return JSON responses
 * - Forward errors to error middleware
 */
export class GameController {
  static createGame(req: Request, res: Response, next: NextFunction) {
    try {
      const { bet } = req.body;

      if (typeof bet !== 'number' || bet <= 0) {
        return res.status(400).json({ error: 'Invalid bet amount' });
      }

      const session = gameService.createGame(bet);

      res.status(201).json({
        gameId: session.id,
        player: session.game.player.hand.value,
        dealerCard: session.game.dealer.hand.firstCard.toString(),
        status: session.status
      });
    } catch (err) {
      next(err);
    }
  }

  static getGame(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const session = gameService.getGame(id);

      res.json({
        id: session.id,
        status: session.status,
        playerHand: session.game.player.hand.toString(),
        playerValue: session.game.player.hand.value,
        dealerHand: session.status === 'finished'
          ? session.game.dealer.hand.toString()
          : '[hidden]',
        dealerValue: session.status === 'finished'
          ? session.game.dealer.hand.value
          : null
      });
    } catch (err) {
      next(err);
    }
  }

  static hit(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const session = gameService.hit(id);

      res.json({
        status: session.status,
        playerHand: session.game.player.hand.toString(),
        playerValue: session.game.player.hand.value
      });
    } catch (err) {
      next(err);
    }
  }

  static stand(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const session = gameService.stand(id);

      res.json({
        status: session.status,
        result: session.game.getResult(),
        dealerHand: session.game.dealer.hand.toString(),
        dealerValue: session.game.dealer.hand.value
      });
    } catch (err) {
      next(err);
    }
  }
}