import { WebSocket } from 'ws';
import { gameStore } from '../state/game.store';
import { gameService } from '../services/game.services';


/**
 * Registers game-related WebSocket events
 *
 * This file contains ONLY:
 * - Message parsing
 * - Event routing
 * - Store interaction
 *
 * No HTTP logic, no Express
 */
export function registerGameSocket(socket: WebSocket) {
  socket.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());

      switch (message.type) {
        case 'game:create': {
          const session = gameStore.createGame();

          socket.send(JSON.stringify({
            type: 'game:created',
            payload: {
              id: session.id,
              state: session.game
            }
          }));
          break;
        }

        case 'game:hit': {
          const { gameId } = message.payload;

          try {
            const session = gameService.hit(gameId);

            socket.send(JSON.stringify({
              type: 'game:update',
              payload: {
                id: session.id,
                state: session.game
              }
            }));
          } catch (err: any) {
            socket.send(JSON.stringify({
              type: 'error',
              message: err.message
            }));
          }

          break;
        }

        case 'game:stand': {
          const { gameId } = message.payload;

          try {
            const session = gameService.stand(gameId);

            socket.send(JSON.stringify({
              type: 'game:finished',
              payload: {
                id: session.id,
                result: session.game.getResult()
              }
            }));
          } catch (err: any) {
            socket.send(JSON.stringify({
              type: 'error',
              message: err.message
            }));
          }

          break;
        }

        default:
          socket.send(JSON.stringify({
            type: 'error',
            message: 'Unknown event type'
          }));
      }
    } catch {
      socket.send(JSON.stringify({
        type: 'error',
        message: 'Invalid message format'
      }));
    }
  });
}