import { Router } from 'express';

import { overview } from '../controllers/stats.controller.js';
import { asyncHandler } from '../middleware/async-handler.js';

export function createStatsRouter() {
  const router = Router();
  router.get('/stats/overview', asyncHandler(overview));
  return router;
}

