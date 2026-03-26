import { Router } from 'express';

import {
  createNotification,
  listNotifications,
} from '../controllers/notifications.controller.js';
import { asyncHandler } from '../middleware/async-handler.js';

export function createNotificationsRouter() {
  const router = Router();

  router.get('/notifications', asyncHandler(listNotifications));
  router.post('/notifications', asyncHandler(createNotification));

  return router;
}

