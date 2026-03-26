import type { Request, Response } from 'express';

import { ReportModel } from '../models/report.js';
import { withId } from '../utils/with-id.js';

export async function listReports(_req: Request, res: Response) {
  const items = await ReportModel.find().sort({ createdAt: -1 }).limit(500);
  res.json(items.map(withId));
}

export async function updateReport(req: Request, res: Response) {
  const updated = await ReportModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Report not found' });
  res.json(withId(updated));
}

