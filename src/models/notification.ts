import mongoose, { Schema } from 'mongoose';

export type NotificationDoc = {
  title: string;
  message: string;
  recipientType: 'all' | 'artists' | 'free' | 'premium' | 'inactive';
  createdAt: string;
};

const NotificationSchema = new Schema<NotificationDoc>(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    recipientType: { type: String, enum: ['all', 'artists', 'free', 'premium', 'inactive'], required: true },
    createdAt: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const NotificationModel =
  (mongoose.models.Notification as mongoose.Model<NotificationDoc>) ??
  mongoose.model<NotificationDoc>('Notification', NotificationSchema);

