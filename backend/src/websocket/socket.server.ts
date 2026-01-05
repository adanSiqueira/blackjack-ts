import { Server as HttpServer } from 'http';
import { WebSocketServer } from 'ws';
import { registerGameSocket } from './game.socket';

/**
 * Initializes the WebSocket server.
 *
 * Purpose:
 * - Attach WebSocket layer to existing HTTP server
 * - Share the same port as REST API
 * - Register domain-specific socket handlers
 */
export function initGameSocket(server: HttpServer) {
  const wss = new WebSocketServer({ server });

  console.log('WebSocket server initialized');

  wss.on('connection', (socket) => {
    console.log('Client connected via WebSocket');

    // Register game-specific socket handlers
    registerGameSocket(socket);

    socket.on('close', () => {
      console.log('Client disconnected');
    });
  });
}