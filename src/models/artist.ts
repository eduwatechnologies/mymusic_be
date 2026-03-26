import mongoose, { Schema } from 'mongoose';

export type ArtistDoc = {
  name: string;
  email: string;
  songs: number;
  followers: number;
  verificationStatus: 'verified' | 'unverified';
};

const ArtistSchema = new Schema<ArtistDoc>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    songs: { type: Number, required: true },
    followers: { type: Number, required: true },
    verificationStatus: { type: String, enum: ['verified', 'unverified'], required: true },
  },
  { timestamps: true, versionKey: false }
);

export const ArtistModel =
  (mongoose.models.Artist as mongoose.Model<ArtistDoc>) ??
  mongoose.model<ArtistDoc>('Artist', ArtistSchema);

