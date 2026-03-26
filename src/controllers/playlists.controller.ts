import type { Request, Response } from 'express';
import mongoose from 'mongoose';

import { PlaylistModel } from '../models/playlist.js';
import { SongModel } from '../models/song.js';
import { withId } from '../utils/with-id.js';

function normalizeSongIds(ids: unknown): mongoose.Types.ObjectId[] {
  if (!Array.isArray(ids)) return [];

  const unique = new Set<string>();
  for (const v of ids) {
    if (typeof v !== 'string') continue;
    if (!mongoose.Types.ObjectId.isValid(v)) continue;
    unique.add(v);
  }

  return Array.from(unique).map((id) => new mongoose.Types.ObjectId(id));
}

async function keepExistingSongIds(songIds: mongoose.Types.ObjectId[]) {
  if (!songIds.length) return [];

  const items = await SongModel.find({ _id: { $in: songIds } }).select('_id').limit(5000);
  const existing = new Set(items.map((s) => String(s._id)));
  return songIds.filter((id) => existing.has(String(id)));
}

export async function listPlaylists(_req: Request, res: Response) {
  const items = await PlaylistModel.find().sort({ createdAt: -1 }).limit(500);
  res.json(items.map(withId));
}

export async function getPlaylist(req: Request, res: Response) {
  const item = await PlaylistModel.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Playlist not found' });
  res.json(withId(item));
}

export async function createPlaylist(req: Request, res: Response) {
  const body = req.body as Partial<{
    name: string;
    createdBy: string;
    followers: number;
    songIds: string[];
  }>;

  const songIds = await keepExistingSongIds(normalizeSongIds(body.songIds));

  const created = await PlaylistModel.create({
    name: body.name,
    createdBy: body.createdBy,
    followers: body.followers ?? 0,
    songIds,
    songCount: songIds.length,
  });
  res.status(201).json(withId(created));
}

export async function updatePlaylist(req: Request, res: Response) {
  const body = req.body as Partial<{
    name: string;
    createdBy: string;
    followers: number;
    songIds: string[];
  }>;

  const patch: Record<string, unknown> = {};
  if (typeof body.name === 'string') patch.name = body.name;
  if (typeof body.createdBy === 'string') patch.createdBy = body.createdBy;
  if (typeof body.followers === 'number') patch.followers = body.followers;
  if (Array.isArray(body.songIds)) {
    const songIds = await keepExistingSongIds(normalizeSongIds(body.songIds));
    patch.songIds = songIds;
    patch.songCount = songIds.length;
  }

  const updated = await PlaylistModel.findByIdAndUpdate(req.params.id, patch, { new: true, runValidators: true });
  if (!updated) return res.status(404).json({ message: 'Playlist not found' });
  res.json(withId(updated));
}

export async function deletePlaylist(req: Request, res: Response) {
  const removed = await PlaylistModel.findByIdAndDelete(req.params.id);
  if (!removed) return res.status(404).json({ message: 'Playlist not found' });
  res.json(withId(removed));
}

export async function listPlaylistSongs(req: Request, res: Response) {
  const playlist = await PlaylistModel.findById(req.params.id);
  if (!playlist) return res.status(404).json({ message: 'Playlist not found' });

  const songIds = playlist.songIds ?? [];
  if (songIds.length) {
    const items = await SongModel.find({ _id: { $in: songIds } }).limit(1000);
    res.json(items.map(withId));
    return;
  }

  const items = await SongModel.find().sort({ createdAt: -1 }).limit(50);
  res.json(items.map(withId));
}
