import { Router } from 'express';

import { health } from '../controllers/health.controller.js';
import { asyncHandler } from '../middleware/async-handler.js';

export function createHealthRouter() {
  const router = Router();
  router.get('/health', asyncHandler(health));
  return router;
}

