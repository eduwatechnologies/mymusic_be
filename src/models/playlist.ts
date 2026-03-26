import mongoose, { Schema } from 'mongoose';

export type PlaylistDoc = {
  name: string;
  createdBy: string;
  songCount: number;
  followers: number;
  songIds?: mongoose.Types.ObjectId[];
};

const PlaylistSchema = new Schema<PlaylistDoc>(
  {
    name: { type: String, required: true, index: true },
    createdBy: { type: String, required: true, index: true },
    songCount: { type: Number, required: true },
    followers: { type: Number, required: true },
    songIds: [{ type: Schema.Types.ObjectId, ref: 'Song', default: [] }],
  },
  { timestamps: true, versionKey: false }
);

export const PlaylistModel =
  (mongoose.models.Playlist as mongoose.Model<PlaylistDoc>) ??
  mongoose.model<PlaylistDoc>('Playlist', PlaylistSchema);
