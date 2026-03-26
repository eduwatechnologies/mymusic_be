import { Router } from 'express';

import {
  listReports,
  updateReport,
} from '../controllers/reports.controller.js';
import { asyncHandler } from '../middleware/async-handler.js';

export function createReportsRouter() {
  const router = Router();

  router.get('/reports', asyncHandler(listReports));
  router.patch('/reports/:id', asyncHandler(updateReport));

  return router;
}

