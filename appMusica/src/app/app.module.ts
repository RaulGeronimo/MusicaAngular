import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Importamos el modulo de http
import { HttpClientModule } from '@angular/common/http';
//Importamos el modulo de FormModule que va enlazar los input
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './componentes/navigation/navigation.component';

import { PaisListComponent } from './componentes/pais-list/pais-list.component';
import { PaisFormComponent } from './componentes/pais-form/pais-form.component';

import { InstrumentoListComponent } from './componentes/instrumento-list/instrumento-list.component';
import { InstrumentoFormComponent } from './componentes/instrumento-form/instrumento-form.component';

import { GruposFormComponent } from './componentes/grupos-form/grupos-form.component';
import { GruposListComponent } from './componentes/grupos-list/grupos-list.component';

import { ArtistaGrupoListComponent } from './componentes/artista-grupo-list/artista-grupo-list.component';
import { ArtistaGrupoFormComponent } from './componentes/artista-grupo-form/artista-grupo-form.component';

import { ArtistaFormComponent } from './componentes/artista-form/artista-form.component';
import { ArtistaListComponent } from './componentes/artista-list/artista-list.component';

import { DisqueraListComponent } from './componentes/disquera-list/disquera-list.component';
import { DisqueraFormComponent } from './componentes/disquera-form/disquera-form.component';

import { AlbumFormComponent } from './componentes/album-form/album-form.component';
import { AlbumListComponent } from './componentes/album-list/album-list.component';

import { CancionesListComponent } from './componentes/canciones-list/canciones-list.component';
import { CancionesFormComponent } from './componentes/canciones-form/canciones-form.component';

import { CancionesAlbumFormComponent } from './componentes/canciones-album-form/canciones-album-form.component';
import { CancionesAlbumListComponent } from './componentes/canciones-album-list/canciones-album-list.component';

//Servicios
import { PaisService } from './servicios/pais.service';
import { InstrumentosService } from './servicios/instrumentos.service';
import { GruposService } from './servicios/grupos.service';
import { ArtistaService } from './servicios/artista.service';
import { ArtistaGrupoService } from './servicios/artista-grupo.service';
import { DisqueraService } from './servicios/disquera.service';
import { AlbumService } from './servicios/album.service';
import { CancionesService } from './servicios/canciones.service';
import { CancionesAlbumService } from './servicios/canciones-album.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PaisListComponent,
    PaisFormComponent,
    InstrumentoListComponent,
    InstrumentoFormComponent,
    GruposFormComponent,
    GruposListComponent,
    ArtistaGrupoListComponent,
    ArtistaGrupoFormComponent,
    ArtistaFormComponent,
    ArtistaListComponent,
    DisqueraListComponent,
    DisqueraFormComponent,
    AlbumFormComponent,
    AlbumListComponent,
    CancionesListComponent,
    CancionesFormComponent,
    CancionesAlbumFormComponent,
    CancionesAlbumListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    PaisService,
    InstrumentosService,
    GruposService,
    ArtistaService,
    ArtistaGrupoService,
    DisqueraService,
    AlbumService,
    CancionesService,
    CancionesAlbumService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
