import mongoose, { Schema } from 'mongoose';

export type ReportDoc = {
  songTitle: string;
  reason: string;
  reportedBy: string;
  reportDate: string;
  status: 'pending' | 'resolved';
};

const ReportSchema = new Schema<ReportDoc>(
  {
    songTitle: { type: String, required: true, index: true },
    reason: { type: String, required: true },
    reportedBy: { type: String, required: true, index: true },
    reportDate: { type: String, required: true },
    status: { type: String, enum: ['pending', 'resolved'], required: true },
  },
  { timestamps: true, versionKey: false }
);

export const ReportModel =
  (mongoose.models.Report as mongoose.Model<ReportDoc>) ??
  mongoose.model<ReportDoc>('Report', ReportSchema);

