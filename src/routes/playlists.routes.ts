import { Router } from 'express';

import {
  createPlaylist,
  deletePlaylist,
  getPlaylist,
  listPlaylists,
  listPlaylistSongs,
  updatePlaylist,
} from '../controllers/playlists.controller.js';
import { asyncHandler } from '../middleware/async-handler.js';

export function createPlaylistsRouter() {
  const router = Router();

  router.get('/playlists', asyncHandler(listPlaylists));
  router.get('/playlists/:id', asyncHandler(getPlaylist));
  router.get('/playlists/:id/songs', asyncHandler(listPlaylistSongs));
  router.post('/playlists', asyncHandler(createPlaylist));
  router.patch('/playlists/:id', asyncHandler(updatePlaylist));
  router.delete('/playlists/:id', asyncHandler(deletePlaylist));

  return router;
}
