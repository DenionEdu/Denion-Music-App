
  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Observable, of } from 'rxjs';
  import { tap, switchMap } from 'rxjs/operators';
  
  @Injectable({
    providedIn: 'root'
  })
  export class SpotifyAuthService {
    private clientId = '386e5dbd07994be4bea454dc69ab666b';
    private clientSecret = '2a1063b476b04f5f968a852eff114b4c';
    private tokenUrl = 'https://accounts.spotify.com/api/token';
    private accessToken: string = '';
    private tokenExpiration: number = 0;
  
    constructor(private http: HttpClient) {}
  
    private fetchToken(): Observable<string> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`)
      });
  
      const body = 'grant_type=client_credentials';
  
      return this.http.post<any>(this.tokenUrl, body, { headers }).pipe(
        tap(response => {
          this.accessToken = response.access_token;
          this.tokenExpiration = Date.now() + response.expires_in * 1000;
        }),
        switchMap(response => of(response.access_token))
      );
    }
  
    getAccessToken(): Observable<string> {
      if (this.accessToken && Date.now() < this.tokenExpiration) {
        return of(this.accessToken);
      }
      return this.fetchToken();
    }
  }
  