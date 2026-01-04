/**
 * Application entry point (bootstrap file)
 *
 * Responsibilities:
 * - Bootstraps the Express application
 * - Loads environment variables
 * - Confirms TypeScript + Node.js runtime configuration
 * - Wires REST routes and WebSocket server
 * - Creates and starts the HTTP server
 * - No business logic in here.
 */

import express from 'express';
import cors from 'cors';
import http from 'http';
import dotenv from 'dotenv';

import { registerGameRoutes } from './api/routes/game.routes';
import { registerHealthRoutes } from './api/routes/health.routes';
import { initGameSocket } from './websocket/socket.server';

/**
 * Loads environment variables from the `.env` file into `process.env`.
 *
 * Purpose:
 * - Validates that dotenv is correctly configured
 * - Ensures environment-dependent configuration (PORT, secrets, etc.)
 *   is available before the server starts
 */
dotenv.config();

/**
 * Application port.
 *
 * Priority:
 * 1. Environment variable (process.env.PORT)
 * 2. Fallback to 3001 for local development
 *
 * This also validates that environment variable resolution is working.
 */
const PORT = process.env.PORT || 3001;

/**
 * Express application instance.
 *
 * Purpose:
 * - Acts as the central HTTP request handler
 * - Receives middleware and route registrations
 */
const app = express();

/**
 * Global middleware configuration.
 *
 * cors():
 * - Enables Cross-Origin Resource Sharing
 * - Allows the backend to be consumed by browsers and external clients
 *
 * express.json():
 * - Parses incoming JSON payloads
 * - Makes request bodies available under `req.body`
 */
app.use(cors());
app.use(express.json());

/**
 * REST route registration.
 *
 * Routes are registered via functions to keep this file clean
 * and to ensure a clear separation between bootstrap logic
 * and HTTP API definitions.
 */
registerHealthRoutes(app);
registerGameRoutes(app);

/**
 * HTTP server creation.
 *
 * Express itself is not a server — it is a request handler.
 * Creating the HTTP server explicitly allows:
 * - WebSocket integration
 * - Future protocol-level configuration
 */
const server = http.createServer(app);

/**
 * WebSocket server initialization.
 *
 * Attaches the WebSocket layer to the existing HTTP server
 * so REST and real-time communication share the same port.
 */
initGameSocket(server);

/**
 * Starts the HTTP server and begins listening for incoming connections.
 *
 * Successful execution confirms:
 * - Port binding works
 * - Node.js runtime is correctly configured
 * - Module resolution and imports succeeded
 */
server.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
