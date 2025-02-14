import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { HttpClientModule } from '@angular/common/http';

// Importar los componentes
import { BuscarComponent } from './components/buscar/buscar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { DetalleCancionComponent } from './components/detalle-cancion/detalle-cancion.component';
import { DetalleArtistaComponent } from './components/detalle-artista/detalle-artista.component';
import { DetalleAlbumComponent } from './components/detalle-album/detalle-album.component';

@NgModule({
  declarations: [
    AppComponent,
    BuscarComponent,
    NavbarComponent,
    InicioComponent,
    DetalleCancionComponent,
    DetalleArtistaComponent,
    DetalleAlbumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
