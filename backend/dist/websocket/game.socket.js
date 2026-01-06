"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerGameSocket = registerGameSocket;
const game_store_1 = require("../state/game.store");
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
function registerGameSocket(socket) {
    socket.on('message', (data) => {
        try {
            const message = JSON.parse(data.toString());
            switch (message.type) {
                case 'game:create': {
                    const session = game_store_1.gameStore.createGame();
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
                    const session = game_store_1.gameStore.getGame(gameId);
                    if (!session) {
                        socket.send(JSON.stringify({
                            type: 'error',
                            message: 'Game not found'
                        }));
                        return;
                    }
                    session.game.hitPlayer();
                    socket.send(JSON.stringify({
                        type: 'game:update',
                        payload: {
                            id: session.id,
                            state: session.game
                        }
                    }));
                    break;
                }
                case 'game:stand': {
                    const { gameId } = message.payload;
                    const session = game_store_1.gameStore.getGame(gameId);
                    if (!session) {
                        socket.send(JSON.stringify({
                            type: 'error',
                            message: 'Game not found'
                        }));
                        return;
                    }
                    session.game.stand();
                    game_store_1.gameStore.finishGame(gameId);
                    socket.send(JSON.stringify({
                        type: 'game:finished',
                        payload: {
                            id: session.id,
                            result: session.game.getResult()
                        }
                    }));
                    break;
                }
                default:
                    socket.send(JSON.stringify({
                        type: 'error',
                        message: 'Unknown event type'
                    }));
            }
        }
        catch {
            socket.send(JSON.stringify({
                type: 'error',
                message: 'Invalid message format'
            }));
        }
    });
}
