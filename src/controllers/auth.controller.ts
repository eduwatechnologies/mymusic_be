import type { Request, Response } from 'express';

import { UserModel } from '../models/user.js';
import type { UserDoc } from '../models/user.js';
import { withId } from '../utils/with-id.js';

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function tokenForUserId(id: string) {
  return `demo-${id}`;
}

export async function register(req: Request, res: Response) {
  const { name, email } = req.body as { name?: string; email?: string; password?: string };

  if (!name || !email) return res.status(400).json({ message: 'Missing name or email' });

  const existing = await UserModel.findOne({ email });
  if (existing) return res.status(409).json({ message: 'Email already in use' });

  const created = await UserModel.create({
    name,
    email,
    joinDate: todayIso(),
    status: 'active',
    listeningTime: '0h',
  });

  const user = withId<UserDoc>(created as any);
  res.status(201).json({ token: tokenForUserId(user.id), user: { id: user.id, name: user.name, email: user.email } });
}

export async function login(req: Request, res: Response) {
  const { email } = req.body as { email?: string; password?: string };
  if (!email) return res.status(400).json({ message: 'Missing email' });

  const userDoc = await UserModel.findOne({ email });
  if (!userDoc) return res.status(401).json({ message: 'Invalid credentials' });

  const user = withId<UserDoc>(userDoc as any);
  res.json({ token: tokenForUserId(user.id), user: { id: user.id, name: user.name, email: user.email } });
}
