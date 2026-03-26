import { Router } from 'express';
import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';

import {
  createSong,
  deleteSong,
  getSong,
  listSongs,
  uploadSong,
  updateSong,
} from '../controllers/songs.controller.js';
import { asyncHandler } from '../middleware/async-handler.js';

export function createSongsRouter() {
  const router = Router();

  const uploadDir = path.resolve(process.cwd(), 'uploads');
  fs.mkdirSync(uploadDir, { recursive: true });
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
      const safeBase = path.basename(file.originalname, path.extname(file.originalname)).replace(/[^a-zA-Z0-9-_]+/g, '-');
      const ext = path.extname(file.originalname).slice(0, 16);
      const unique = `${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
      cb(null, `${safeBase}-${unique}${ext}`);
    },
  });
  const upload = multer({ storage });

  router.get('/songs', asyncHandler(listSongs));
  router.get('/songs/:id', asyncHandler(getSong));
  router.post('/songs/upload', upload.single('file'), asyncHandler(uploadSong));
  router.post('/songs', asyncHandler(createSong));
  router.patch('/songs/:id', asyncHandler(updateSong));
  router.delete('/songs/:id', asyncHandler(deleteSong));

  return router;
}
