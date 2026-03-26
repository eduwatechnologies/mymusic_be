import mongoose from 'mongoose';

export async function connectDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error('Missing MONGODB_URI');

  if (mongoose.connection.readyState === 1) return;
  if (mongoose.connection.readyState === 2) {
    await new Promise<void>((resolve, reject) => {
      mongoose.connection.once('connected', () => resolve());
      mongoose.connection.once('error', (err) => reject(err));
    });
    return;
  }

  await mongoose.connect(uri, { autoIndex: true });
}

