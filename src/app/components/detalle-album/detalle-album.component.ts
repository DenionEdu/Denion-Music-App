import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotifySearchService } from '../../services/spotify-search.service';

@Component({
  selector: 'app-detalle-album',
  templateUrl: './detalle-album.component.html',
  styleUrls: ['./detalle-album.component.css'],
  standalone: false
})
export class DetalleAlbumComponent implements OnInit {
  album: any = null;

  constructor(
    private route: ActivatedRoute, 
    private spotifyService: SpotifySearchService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const albumId = params['id'];
      if (albumId) {
        this.getAlbumDetails(albumId);
      }
    });
  }

  getAlbumDetails(albumId: string): void {
    this.spotifyService.getAlbumById(albumId).subscribe(album => {
      this.album = album;
    });
  }

  goToTrackDetail(trackId: string): void {
    this.router.navigate(['/detalle-cancion', trackId]);
  }
}
