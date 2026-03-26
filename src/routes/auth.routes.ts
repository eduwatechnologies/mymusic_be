import { Router } from 'express';

import { login, register } from '../controllers/auth.controller.js';
import { asyncHandler } from '../middleware/async-handler.js';

export function createAuthRouter() {
  const router = Router();

  router.post('/auth/register', asyncHandler(register));
  router.post('/auth/login', asyncHandler(login));

  return router;
}

