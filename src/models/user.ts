import mongoose, { Schema } from 'mongoose';

export type UserDoc = {
  name: string;
  email: string;
  joinDate: string;
  status: 'active' | 'suspended';
  listeningTime: string;
};

const UserSchema = new Schema<UserDoc>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    joinDate: { type: String, required: true },
    status: { type: String, enum: ['active', 'suspended'], required: true },
    listeningTime: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export const UserModel =
  (mongoose.models.User as mongoose.Model<UserDoc>) ??
  mongoose.model<UserDoc>('User', UserSchema);

