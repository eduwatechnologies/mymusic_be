import type { Request, Response } from 'express';

import { ArtistModel } from '../models/artist.js';
import { withId } from '../utils/with-id.js';

export async function listArtists(_req: Request, res: Response) {
  const items = await ArtistModel.find().sort({ createdAt: -1 }).limit(500);
  res.json(items.map(withId));
}

export async function getArtist(req: Request, res: Response) {
  const item = await ArtistModel.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Artist not found' });
  res.json(withId(item));
}

export async function createArtist(req: Request, res: Response) {
  const body = req.body as Partial<{
    name: string;
    email: string;
    songs: number;
    followers: number;
    verificationStatus: 'verified' | 'unverified';
  }>;

  const created = await ArtistModel.create({
    name: body.name,
    email: body.email,
    songs: body.songs ?? 0,
    followers: body.followers ?? 0,
    verificationStatus: body.verificationStatus ?? 'unverified',
  });
  res.status(201).json(withId(created));
}

export async function updateArtist(req: Request, res: Response) {
  const updated = await ArtistModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!updated) return res.status(404).json({ message: 'Artist not found' });
  res.json(withId(updated));
}

export async function deleteArtist(req: Request, res: Response) {
  const removed = await ArtistModel.findByIdAndDelete(req.params.id);
  if (!removed) return res.status(404).json({ message: 'Artist not found' });
  res.json(withId(removed));
}
