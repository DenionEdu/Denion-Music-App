import { Album } from "./album.model";
import { Track } from "./track.model";

export interface Artist {
  id: string;
  name: string;
  images?: { url: string }[];
  genres?: string[];
  external_urls: {
    spotify: string;
  };
  popularity?: number;
  followers?: {
    total: number;
  };
  albums?: Album[];  // Nueva propiedad para los álbumes
  topTracks?: Track[];  // Nueva propiedad para las canciones más populares
}
