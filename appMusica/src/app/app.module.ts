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

//Servicios
import { PaisService } from './servicios/pais.service';
import { InstrumentosService } from './servicios/instrumentos.service';
import { GruposService } from './servicios/grupos.service';
import { ArtistaService } from './servicios/artista.service';
import { ArtistaGrupoService } from './servicios/artista-grupo.service';

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
    ArtistaListComponent
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
    ArtistaGrupoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
