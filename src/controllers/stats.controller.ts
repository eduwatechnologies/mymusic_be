import type { Request, Response } from 'express';

// import { chartDataSeed } from '../data.js';
import { ArtistModel } from '../models/artist.js';
import { SongModel } from '../models/song.js';
import { UserModel } from '../models/user.js';

export async function overview(_req: Request, res: Response) {
  const [users, songs, artists, streamsAgg, topSongs, topArtists] = await Promise.all([
    UserModel.countDocuments(),
    SongModel.countDocuments(),
    ArtistModel.countDocuments(),
    SongModel.aggregate<{ total: number }>([{ $group: { _id: null, total: { $sum: '$streams' } } }]),
    SongModel.find({}, { title: 1, streams: 1 }).sort({ streams: -1 }).limit(5),
    ArtistModel.find({}, { name: 1, followers: 1 }).sort({ followers: -1 }).limit(5),
  ]);

  res.json({
    totals: {
      users,
      songs,
      artists,
      streams: streamsAgg[0]?.total ?? 0,
    },
    // chartData: chartDataSeed,
    topSongsData: topSongs.map((s) => ({ name: s.title, streams: s.streams })),
    topArtistsData: topArtists.map((a) => ({ name: a.name, followers: a.followers })),
  });
}

