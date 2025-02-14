import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifySearchService } from '../../services/spotify-search.service';

@Component({
  selector: 'app-detalle-artista',
  templateUrl: './detalle-artista.component.html',
  styleUrls: ['./detalle-artista.component.css'],
  standalone: false
})
export class DetalleArtistaComponent implements OnInit {
  artista: any = null;
  albums: any[] = [];
  topTracks: any[] = [];

  constructor(
    private route: ActivatedRoute, 
    private spotifyService: SpotifySearchService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const artistId = params['id'];
      if (artistId) {
        this.getArtistDetails(artistId);
        this.getArtistAlbums(artistId);
        this.getArtistTopTracks(artistId);
      }
    });
  }

  getArtistDetails(artistId: string): void {
    this.spotifyService.getArtistById(artistId).subscribe(artist => {
      this.artista = artist;
    });
  }

  getArtistAlbums(artistId: string): void {
    this.spotifyService.getArtistAlbums(artistId).subscribe(response => {
      this.albums = response.items;
    });
  }

  getArtistTopTracks(artistId: string): void {
    this.spotifyService.getArtistTopTracks(artistId).subscribe(response => {
      this.topTracks = response.tracks;
    });
  }

  goToAlbumDetail(albumId: string): void {
    this.router.navigate(['/detalle-album', albumId]);
  }

  goToTrackDetail(trackId: string): void {
    this.router.navigate(['/detalle-cancion', trackId]);
  }
}
