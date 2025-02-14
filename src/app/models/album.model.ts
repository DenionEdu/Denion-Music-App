import { Artist } from './artist.model';
import { Track } from './track.model';

export interface Album {
  id: string;
  name: string;
  images: { url: string }[];
  release_date: string;
  total_tracks: number;
  artists: Artist[]; // Información del artista
  external_urls: { spotify: string };
  tracks?: { items: Track[] }; // Lista de canciones del álbum
}
