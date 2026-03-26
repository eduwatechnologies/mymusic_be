import { Router } from 'express';

import {
  getSettings,
  updateSettings,
} from '../controllers/settings.controller.js';
import { asyncHandler } from '../middleware/async-handler.js';

export function createSettingsRouter() {
  const router = Router();

  router.get('/settings', asyncHandler(getSettings));
  router.put('/settings', asyncHandler(updateSettings));

  return router;
}

