import type { Request, Response } from 'express';

import { SettingsModel } from '../models/settings.js';
import type { Settings } from '../types.js';
import { withId } from '../utils/with-id.js';

export async function getSettings(_req: Request, res: Response) {
  const doc = await SettingsModel.findOne();
  if (!doc) return res.status(404).json({ message: 'Settings not initialized' });
  res.json(withId(doc));
}

export async function updateSettings(req: Request, res: Response) {
  const next = req.body as Partial<Settings>;
  const existing = await SettingsModel.findOne();
  const updated = existing
    ? await SettingsModel.findByIdAndUpdate(existing._id, next, { new: true })
    : await SettingsModel.create(next);
  res.json(withId(updated!));
}

