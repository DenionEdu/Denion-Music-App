import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SpotifyAuthService } from './spotify-auth.service';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifySearchService {
  private apiUrl = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient, private authService: SpotifyAuthService) {}

  private getHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  search(query: string): Observable<any> {
    return this.authService.getAccessToken().pipe(
      switchMap(token => {
        const url = `${this.apiUrl}/search?q=${encodeURIComponent(query)}&type=track,artist,album&market=US&limit=10`;
        return this.http.get(url, { headers: this.getHeaders(token) });
      }),
      catchError(error => {
        console.error('Error en la búsqueda:', error);
        return throwError(() => new Error('Error al buscar en Spotify'));
      })
    );
  }

  getTrackById(trackId: string): Observable<any> {
    return this.authService.getAccessToken().pipe(
      switchMap(token => {
        const url = `${this.apiUrl}/tracks/${trackId}`;
        return this.http.get(url, { headers: this.getHeaders(token) });
      }),
      catchError(error => {
        console.error('Error al obtener la canción:', error);
        return throwError(() => new Error('Error al obtener la canción'));
      })
    );
  }

  getArtistById(artistId: string): Observable<any> {
    return this.authService.getAccessToken().pipe(
      switchMap(token => {
        const url = `${this.apiUrl}/artists/${artistId}`;
        return this.http.get(url, { headers: this.getHeaders(token) });
      }),
      catchError(error => {
        console.error('Error al obtener el artista:', error);
        return throwError(() => new Error('Error al obtener el artista'));
      })
    );
  }

  getAlbumById(albumId: string): Observable<any> {
    return this.authService.getAccessToken().pipe(
      switchMap(token => {
        const url = `${this.apiUrl}/albums/${albumId}?market=US`;
        return this.http.get(url, { headers: this.getHeaders(token) });
      }),
      catchError(error => {
        console.error('Error al obtener el álbum:', error);
        return throwError(() => new Error('Error al obtener el álbum'));
      })
    );
  }

  getArtistAlbums(artistId: string): Observable<any> {
    return this.authService.getAccessToken().pipe(
      switchMap(token => {
        const url = `${this.apiUrl}/artists/${artistId}/albums?market=US&include_groups=album&limit=50`;
        return this.http.get(url, { headers: this.getHeaders(token) });
      }),
      catchError(error => {
        console.error('Error al obtener los álbumes del artista:', error);
        return throwError(() => new Error('Error al obtener los álbumes del artista'));
      })
    );
  }

  // 🎤 Obtener artistas populares
  getTrendingArtists(): Observable<any> {
    const artistIds = '1uNFoZAHBGtllmzznpCI3s,6eUKZXaKkcviH0Ku9w2n3V'; // Justin Bieber, Ed Sheeran
    return this.authService.getAccessToken().pipe(
      switchMap(token => this.http.get(`${this.apiUrl}/artists?ids=${artistIds}`, { headers: this.getHeaders(token) })),
      catchError(error => this.handleError('getTrendingArtists', error))
    );
  }

  // 📀 Obtener álbumes destacados
  getFeaturedAlbums(): Observable<any> {
    return this.authService.getAccessToken().pipe(
      switchMap(token => this.http.get(`${this.apiUrl}/browse/new-releases?limit=10`, { headers: this.getHeaders(token) })),
      catchError(error => this.handleError('getFeaturedAlbums', error))
    );
  }

  // 🎶 Obtener canciones populares globalmente (usando new releases)
  getPopularTracks(): Observable<any> {
    return this.authService.getAccessToken().pipe(
      switchMap(token => this.http.get(`${this.apiUrl}/browse/new-releases?limit=10`, { headers: this.getHeaders(token) })),
      catchError(error => this.handleError('getPopularTracks', error))
    );
  }

  // 🎧 Obtener las canciones más populares de artistas seleccionados
  getArtistTopTracks(artistId: string): Observable<any> {
    return this.authService.getAccessToken().pipe(
      switchMap(token => {
        const url = `${this.apiUrl}/artists/${artistId}/top-tracks?market=US`;
        return this.http.get(url, { headers: this.getHeaders(token) });
      }),
      catchError(error => this.handleError('getArtistTopTracks', error))
    );
  }

  // 🔥 Obtener listas de reproducción populares (reemplazo de top tracks diarios)
  getTrendingPlaylists(): Observable<any> {
    return this.authService.getAccessToken().pipe(
      switchMap(token => this.http.get(`${this.apiUrl}/browse/featured-playlists?limit=10`, { headers: this.getHeaders(token) })),
      catchError(error => this.handleError('getTrendingPlaylists', error))
    );
  }

  private handleError(method: string, error: any) {
    console.error(`Error en ${method}:`, error);
    return throwError(() => new Error(`Error en ${method}: ${error.message || error.statusText}`));
  }

  
}
