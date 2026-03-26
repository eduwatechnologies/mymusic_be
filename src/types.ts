export type User = {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  status: 'active' | 'suspended';
  listeningTime: string;
};

export type Artist = {
  id: string;
  name: string;
  email: string;
  songs: number;
  followers: number;
  verificationStatus: 'verified' | 'unverified';
};

export type Song = {
  id: string;
  title: string;
  artist: string;
  genre: string;
  streams: number;
  uploadDate: string;
};

export type Playlist = {
  id: string;
  name: string;
  createdBy: string;
  songCount: number;
  followers: number;
};

export type Genre = {
  id: string;
  name: string;
};

export type Report = {
  id: string;
  songTitle: string;
  reason: string;
  reportedBy: string;
  reportDate: string;
  status: 'pending' | 'resolved';
};

export type Notification = {
  id: string;
  title: string;
  message: string;
  recipientType: 'all' | 'artists' | 'free' | 'premium' | 'inactive';
  createdAt: string;
};

export type Settings = {
  maxUploadSizeMb: number;
  allowedAudioFormats: string[];
  defaultQuality: 'low' | 'medium' | 'high' | 'lossless';
  explicitContentFilterEnabled: boolean;
  copyrightDetectionEnabled: boolean;
  requireArtistVerification: boolean;
};

export type ChartPoint = { date: string; streams: number };
export type TopSongPoint = { name: string; streams: number };
export type TopArtistPoint = { name: string; followers: number };

export type Overview = {
  totals: {
    users: number;
    songs: number;
    artists: number;
    streams: number;
  };
  chartData: ChartPoint[];
  topSongsData: TopSongPoint[];
  topArtistsData: TopArtistPoint[];
};

