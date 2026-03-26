import type { Request, Response } from 'express';

import { NotificationModel } from '../models/notification.js';
import type { Notification } from '../types.js';
import { withId } from '../utils/with-id.js';

export async function listNotifications(_req: Request, res: Response) {
  const items = await NotificationModel.find().sort({ createdAt: -1 }).limit(500);
  res.json(items.map(withId));
}

export async function createNotification(req: Request, res: Response) {
  const body = req.body as Pick<Notification, 'title' | 'message' | 'recipientType'>;
  const createdAt = new Date().toISOString();
  const created = await NotificationModel.create({
    title: String(body.title ?? ''),
    message: String(body.message ?? ''),
    recipientType: body.recipientType ?? 'all',
    createdAt,
  });
  res.status(201).json(withId(created));
}

