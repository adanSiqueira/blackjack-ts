import { Request, Response, NextFunction } from 'express';

/**
 * Global error-handling middleware.
 * - Must have 4 parameters to be recognized by Express as an error middleware
 * - Should be the last middleware registered in the app
 */
export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error('[ERROR]', err.message);

  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
}
