import type { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ message: 'Invalid id' });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ message: err.message });
  }

  const message = err instanceof Error ? err.message : 'Internal Server Error';
  res.status(500).json({ message });
}

