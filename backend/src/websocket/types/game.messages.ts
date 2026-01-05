import { Game } from '@blackjack/domain';

/**
 * Messages sent FROM client TO server
 */
export type ClientMessage =
  | {
      type: 'game:create';
    }
  | {
      type: 'game:hit';
      payload: {
        gameId: string;
      };
    }
  | {
      type: 'game:stand';
      payload: {
        gameId: string;
      };
    };

/**
 * Messages sent FROM server TO client
 */
export type ServerMessage =
  | {
      type: 'game:created';
      payload: {
        id: string;
        state: Game;
      };
    }
  | {
      type: 'game:update';
      payload: {
        id: string;
        state: Game;
      };
    }
  | {
      type: 'game:finished';
      payload: {
        id: string;
        result: string;
      };
    }
  | {
      type: 'error';
      message: string;
    };