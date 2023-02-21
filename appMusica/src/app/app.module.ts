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

//Servicios
import { PaisService } from './servicios/pais.service';
import { InstrumentosService } from './servicios/instrumentos.service';
import { GruposService } from './servicios/grupos.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PaisListComponent,
    PaisFormComponent,
    InstrumentoListComponent,
    InstrumentoFormComponent,
    GruposFormComponent,
    GruposListComponent
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
    GruposService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
