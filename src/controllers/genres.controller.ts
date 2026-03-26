import type { Request, Response } from 'express';

import { GenreModel } from '../models/genre.js';
import { withId } from '../utils/with-id.js';

export async function listGenres(_req: Request, res: Response) {
  const items = await GenreModel.find().sort({ createdAt: -1 }).limit(500);
  res.json(items.map(withId));
}

export async function createGenre(req: Request, res: Response) {
  const created = await GenreModel.create(req.body);
  res.status(201).json(withId(created));
}

export async function updateGenre(req: Request, res: Response) {
  const updated = await GenreModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!updated) return res.status(404).json({ message: 'Genre not found' });
  res.json(withId(updated));
}

export async function deleteGenre(req: Request, res: Response) {
  const removed = await GenreModel.findByIdAndDelete(req.params.id);
  if (!removed) return res.status(404).json({ message: 'Genre not found' });
  res.json(withId(removed));
}
