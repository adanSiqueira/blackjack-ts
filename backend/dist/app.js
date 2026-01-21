"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const health_routes_1 = __importDefault(require("./api/routes/health.routes"));
const game_routes_1 = __importDefault(require("./api/routes/game.routes"));
const error_middleware_1 = require("./api/middleware/error.middleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
/**
 * API routes
 * These must come BEFORE the frontend static handler
 */
app.use('/health', health_routes_1.default);
app.use('/api/game', game_routes_1.default);
/**
 * Frontend (Vite build) serving
 *
 * This allows the backend to serve the React SPA in production.
 * React Router requires a catch-all route that returns index.html.
 */
const frontendDistPath = path_1.default.resolve(__dirname, '../../frontend/dist');
// Serve static assets (JS, CSS, images)
app.use(express_1.default.static(frontendDistPath));
// SPA fallback (React Router)
app.get('*', (_req, res) => {
    res.sendFile(path_1.default.join(frontendDistPath, 'index.html'));
});
/**
 * Global error handler
 * Must be registered AFTER routes
 */
app.use(error_middleware_1.errorMiddleware);
exports.default = app;
