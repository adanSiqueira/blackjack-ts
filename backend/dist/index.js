"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const socket_server_1 = require("./websocket/socket.server");
/**
 * Loads environment variables from the `.env` file into `process.env`.
 *
 * Purpose:
 * - Validates that dotenv is correctly configured
 * - Ensures environment-dependent configuration (PORT, secrets, etc.)
 *   is available before the server starts
 */
dotenv_1.default.config();
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
 * HTTP server creation.
 *
 * Express itself is not a server — it is a request handler.
 * Creating the HTTP server explicitly allows:
 * - WebSocket integration
 * - Future protocol-level configuration
 */
const server = http_1.default.createServer(app_1.default);
/**
 * WebSocket server initialization.
 *
 * Attaches the WebSocket layer to the existing HTTP server
 * so REST and real-time communication share the same port.
 */
(0, socket_server_1.initGameSocket)(server);
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
