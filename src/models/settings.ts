import mongoose, { Schema } from 'mongoose';

export type SettingsDoc = {
  maxUploadSizeMb: number;
  allowedAudioFormats: string[];
  defaultQuality: 'low' | 'medium' | 'high' | 'lossless';
  explicitContentFilterEnabled: boolean;
  copyrightDetectionEnabled: boolean;
  requireArtistVerification: boolean;
};

const SettingsSchema = new Schema<SettingsDoc>(
  {
    maxUploadSizeMb: { type: Number, required: true },
    allowedAudioFormats: { type: [String], required: true },
    defaultQuality: { type: String, enum: ['low', 'medium', 'high', 'lossless'], required: true },
    explicitContentFilterEnabled: { type: Boolean, required: true },
    copyrightDetectionEnabled: { type: Boolean, required: true },
    requireArtistVerification: { type: Boolean, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const SettingsModel =
  (mongoose.models.Settings as mongoose.Model<SettingsDoc>) ??
  mongoose.model<SettingsDoc>('Settings', SettingsSchema);

