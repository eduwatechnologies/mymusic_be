import type { Request, Response } from 'express';

import { UserModel } from '../models/user.js';
import { withId } from '../utils/with-id.js';

export async function listUsers(_req: Request, res: Response) {
  const items = await UserModel.find().sort({ createdAt: -1 }).limit(500);
  res.json(items.map(withId));
}

export async function getUser(req: Request, res: Response) {
  const item = await UserModel.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'User not found' });
  res.json(withId(item));
}

export async function createUser(req: Request, res: Response) {
  const created = await UserModel.create(req.body);
  res.status(201).json(withId(created));
}

export async function updateUser(req: Request, res: Response) {
  const updated = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'User not found' });
  res.json(withId(updated));
}

export async function deleteUser(req: Request, res: Response) {
  const removed = await UserModel.findByIdAndDelete(req.params.id);
  if (!removed) return res.status(404).json({ message: 'User not found' });
  res.json(withId(removed));
}

