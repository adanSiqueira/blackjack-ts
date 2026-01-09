"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerGameSocket = registerGameSocket;
const game_store_1 = require("../state/game.store");
const game_services_1 = require("../services/game.services");
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
                    try {
                        const session = game_services_1.gameService.hit(gameId);
                        socket.send(JSON.stringify({
                            type: 'game:update',
                            payload: {
                                id: session.id,
                                state: session.game
                            }
                        }));
                    }
                    catch (err) {
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
                        const session = game_services_1.gameService.stand(gameId);
                        socket.send(JSON.stringify({
                            type: 'game:finished',
                            payload: {
                                id: session.id,
                                result: session.game.getResult()
                            }
                        }));
                    }
                    catch (err) {
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
        }
        catch {
            socket.send(JSON.stringify({
                type: 'error',
                message: 'Invalid message format'
            }));
        }
    });
}
