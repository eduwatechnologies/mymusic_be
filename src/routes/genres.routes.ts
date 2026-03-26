import { Router } from 'express';

import {
  createGenre,
  deleteGenre,
  listGenres,
  updateGenre,
} from '../controllers/genres.controller.js';
import { asyncHandler } from '../middleware/async-handler.js';

export function createGenresRouter() {
  const router = Router();

  router.get('/genres', asyncHandler(listGenres));
  router.post('/genres', asyncHandler(createGenre));
  router.patch('/genres/:id', asyncHandler(updateGenre));
  router.delete('/genres/:id', asyncHandler(deleteGenre));

  return router;
}

