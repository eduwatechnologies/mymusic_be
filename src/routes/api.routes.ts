import { Router } from 'express';

import { createAuthRouter } from './auth.routes.js';
import { createArtistsRouter } from './artists.routes.js';
import { createGenresRouter } from './genres.routes.js';
import { createHealthRouter } from './health.routes.js';
import { createNotificationsRouter } from './notifications.routes.js';
import { createPlaylistsRouter } from './playlists.routes.js';
import { createReportsRouter } from './reports.routes.js';
import { createSettingsRouter } from './settings.routes.js';
import { createSongsRouter } from './songs.routes.js';
import { createStatsRouter } from './stats.routes.js';
import { createUsersRouter } from './users.routes.js';

export function createApiRouter() {
  const router = Router();

  router.use(createHealthRouter());
  router.use(createAuthRouter());
  router.use(createStatsRouter());
  router.use(createUsersRouter());
  router.use(createArtistsRouter());
  router.use(createSongsRouter());
  router.use(createPlaylistsRouter());
  router.use(createGenresRouter());
  router.use(createReportsRouter());
  router.use(createNotificationsRouter());
  router.use(createSettingsRouter());

  return router;
}

