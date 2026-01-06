"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = errorMiddleware;
/**
 * Global error-handling middleware.
 * - Must have 4 parameters to be recognized by Express as an error middleware
 * - Should be the last middleware registered in the app
 */
function errorMiddleware(err, _req, res, _next) {
    console.error('[ERROR]', err.message);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message
    });
}
