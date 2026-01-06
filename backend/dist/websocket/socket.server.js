"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initGameSocket = initGameSocket;
const ws_1 = require("ws");
const game_socket_1 = require("./game.socket");
/**
 * Initializes the WebSocket server.
 *
 * Purpose:
 * - Attach WebSocket layer to existing HTTP server
 * - Share the same port as REST API
 * - Register domain-specific socket handlers
 */
function initGameSocket(server) {
    const wss = new ws_1.WebSocketServer({ server });
    console.log('WebSocket server initialized');
    wss.on('connection', (socket) => {
        console.log('Client connected via WebSocket');
        // Register game-specific socket handlers
        (0, game_socket_1.registerGameSocket)(socket);
        socket.on('close', () => {
            console.log('Client disconnected');
        });
    });
}
