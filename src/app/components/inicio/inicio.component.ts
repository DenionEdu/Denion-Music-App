import { Component, OnInit } from '@angular/core';
import { SpotifySearchService } from '../../services/spotify-search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: false,
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  trendingArtists: any[] = [];
  featuredAlbums: any[] = [];
  popularTracks: any[] = [];
  topTracksByArtists: any[] = [];

  constructor(private spotifyService: SpotifySearchService, private router: Router) {}

  ngOnInit(): void {
    this.getTrendingArtists();
    this.getFeaturedAlbums();
    this.getPopularTracks();
    this.getTopTracksByArtists();
  }

  getTrendingArtists(): void {
    this.spotifyService.getTrendingArtists().subscribe(data => {
      this.trendingArtists = data.artists || [];
    });
  }

  getFeaturedAlbums(): void {
    this.spotifyService.getFeaturedAlbums().subscribe(data => {
      this.featuredAlbums = data.albums.items || [];
    });
  }

  getPopularTracks(): void {
    this.spotifyService.getPopularTracks().subscribe(data => {
      this.popularTracks = data.albums.items.map((album: any) => album.name);
    });
  }

  getTopTracksByArtists(): void {
    const artistId = '1uNFoZAHBGtllmzznpCI3s'; // Justin Bieber (ejemplo)
    this.spotifyService.getArtistTopTracks(artistId).subscribe(data => {
      this.topTracksByArtists = data.tracks || [];
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
