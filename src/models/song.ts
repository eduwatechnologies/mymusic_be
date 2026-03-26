import mongoose, { Schema } from 'mongoose';

export type SongDoc = {
  title: string;
  artist: string;
  genre: string;
  streams: number;
  uploadDate: string;
  audioUrl?: string;
};

const SongSchema = new Schema<SongDoc>(
  {
    title: { type: String, required: true, index: true },
    artist: { type: String, required: true, index: true },
    genre: { type: String, required: true, index: true },
    streams: { type: Number, required: true },
    uploadDate: { type: String, required: true },
    audioUrl: { type: String, required: false },
  },
  { timestamps: true, versionKey: false }
);

export const SongModel =
  (mongoose.models.Song as mongoose.Model<SongDoc>) ??
  mongoose.model<SongDoc>('Song', SongSchema);

