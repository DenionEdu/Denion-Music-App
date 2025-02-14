import { Album } from './album.model';
import { Artist } from './artist.model';

export interface Track {
  id: string;
  name: string;
  artists: Artist[];
  album: Album;
  duration_ms: number;
  popularity: number;
  external_urls: { spotify: string };
  preview_url?: string; // URL de muestra de la canción
  explicit?: boolean; // Indica si la canción tiene contenido explícito
}
