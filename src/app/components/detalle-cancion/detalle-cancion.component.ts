import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifySearchService } from '../../services/spotify-search.service';

@Component({
  selector: 'app-detalle-cancion',
  templateUrl: './detalle-cancion.component.html',
  styleUrls: ['./detalle-cancion.component.css'],
  standalone: false
})
export class DetalleCancionComponent implements OnInit {
  track: any = null;

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifySearchService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const trackId = params['id'];
      if (trackId) {
        this.getTrackDetails(trackId);
      }
    });
  }

  getTrackDetails(trackId: string): void {
    this.spotifyService.getTrackById(trackId).subscribe({
      next: (track) => {
        this.track = track;
      },
      error: (err) => {
        console.error('Error al obtener detalles de la canción:', err);
      }
    });
  }
  
}
