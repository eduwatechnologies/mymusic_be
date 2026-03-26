import { Router } from 'express';

import {
  createArtist,
  deleteArtist,
  getArtist,
  listArtists,
  updateArtist,
} from '../controllers/artists.controller.js';
import { asyncHandler } from '../middleware/async-handler.js';

export function createArtistsRouter() {
  const router = Router();

  router.get('/artists', asyncHandler(listArtists));
  router.get('/artists/:id', asyncHandler(getArtist));
  router.post('/artists', asyncHandler(createArtist));
  router.patch('/artists/:id', asyncHandler(updateArtist));
  router.delete('/artists/:id', asyncHandler(deleteArtist));

  return router;
}

