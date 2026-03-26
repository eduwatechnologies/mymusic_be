import { Router } from 'express';

import {
  createUser,
  deleteUser,
  getUser,
  listUsers,
  updateUser,
} from '../controllers/users.controller.js';
import { asyncHandler } from '../middleware/async-handler.js';

export function createUsersRouter() {
  const router = Router();

  router.get('/users', asyncHandler(listUsers));
  router.get('/users/:id', asyncHandler(getUser));
  router.post('/users', asyncHandler(createUser));
  router.patch('/users/:id', asyncHandler(updateUser));
  router.delete('/users/:id', asyncHandler(deleteUser));

  return router;
}

