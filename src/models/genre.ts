import mongoose, { Schema } from 'mongoose';

export type GenreDoc = {
  name: string;
};

const GenreSchema = new Schema<GenreDoc>(
  {
    name: { type: String, required: true, index: true },
  },
  { timestamps: true, versionKey: false }
);

export const GenreModel =
  (mongoose.models.Genre as mongoose.Model<GenreDoc>) ??
  mongoose.model<GenreDoc>('Genre', GenreSchema);

