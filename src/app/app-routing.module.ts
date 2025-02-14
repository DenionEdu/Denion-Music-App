import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { DetalleCancionComponent } from './components/detalle-cancion/detalle-cancion.component';
import { DetalleArtistaComponent } from './components/detalle-artista/detalle-artista.component';
import { DetalleAlbumComponent } from './components/detalle-album/detalle-album.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'buscar/:termino', component: BuscarComponent },
  { path: 'detalle-cancion/:id', component: DetalleCancionComponent },
  { path: 'detalle-artista/:id', component: DetalleArtistaComponent },
  { path: 'detalle-album/:id', component: DetalleAlbumComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
