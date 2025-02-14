import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifySearchService } from '../../services/spotify-search.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css'],
  standalone: false
})
export class BuscarComponent implements OnInit {
  searchTerm: string = '';
  tracks: any[] = [];
  albums: any[] = [];
  artists: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spotifyService: SpotifySearchService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.searchTerm = params['termino'];
      this.searchMusic();
    });
  }

  searchMusic(): void {
    if (!this.searchTerm) return;
  
    this.spotifyService.search(this.searchTerm).subscribe({
      next: (response: any) => {
        this.tracks = response.tracks?.items || [];
        this.albums = response.albums?.items || [];
        this.artists = response.artists?.items || [];
      },
      error: (err) => {
        console.error('Error en la búsqueda:', err);
      }
    });
  }
  

  goToTrackDetail(trackId: string): void {
    this.router.navigate(['/detalle-cancion', trackId]);
  }

  goToArtistDetail(artistId: string): void {
    this.router.navigate(['/detalle-artista', artistId]);
  }

  goToAlbumDetail(albumId: string): void {
    this.router.navigate(['/detalle-album', albumId]);
  }
}
