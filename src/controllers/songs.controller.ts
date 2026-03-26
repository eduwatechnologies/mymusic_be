import type { Request, Response } from 'express';

import { SongModel } from '../models/song.js';
import { withId } from '../utils/with-id.js';

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export async function listSongs(_req: Request, res: Response) {
  const items = await SongModel.find().sort({ createdAt: -1 }).limit(1000);
  res.json(items.map(withId));
}

export async function getSong(req: Request, res: Response) {
  const item = await SongModel.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Song not found' });
  res.json(withId(item));
}

export async function createSong(req: Request, res: Response) {
  const body = req.body as Partial<{
    title: string;
    artist: string;
    genre: string;
    streams: number;
    uploadDate: string;
    audioUrl?: string;
  }>;

  const created = await SongModel.create({
    title: body.title,
    artist: body.artist,
    genre: body.genre,
    streams: body.streams ?? 0,
    uploadDate: body.uploadDate ?? todayIso(),
    audioUrl: body.audioUrl,
  });
  res.status(201).json(withId(created));
}

export async function updateSong(req: Request, res: Response) {
  const updated = await SongModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!updated) return res.status(404).json({ message: 'Song not found' });
  res.json(withId(updated));
}

export async function deleteSong(req: Request, res: Response) {
  const removed = await SongModel.findByIdAndDelete(req.params.id);
  if (!removed) return res.status(404).json({ message: 'Song not found' });
  res.json(withId(removed));
}

export async function uploadSong(req: Request, res: Response) {
  const file = (req as Request & { file?: Express.Multer.File }).file;
  if (!file) return res.status(400).json({ message: 'Missing file' });

  const body = req.body as Partial<{
    title: string;
    artist: string;
    genre: string;
    uploadDate: string;
  }>;

  const audioUrl = `/uploads/${file.filename}`;

  const created = await SongModel.create({
    title: body.title ?? file.originalname,
    artist: body.artist ?? 'Unknown Artist',
    genre: body.genre ?? 'Unknown',
    streams: 0,
    uploadDate: body.uploadDate ?? todayIso(),
    audioUrl,
  });

  res.status(201).json(withId(created));
}
