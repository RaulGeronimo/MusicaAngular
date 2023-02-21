//Importacion que permite definir las rutas de la app
import { NgModule } from '@angular/core';
//Importamos el archivo que viene en la ruta sig.
import { RouterModule, Routes } from '@angular/router';

//Importacion de las Listas
import { PaisListComponent } from './componentes/pais-list/pais-list.component';
import { InstrumentoListComponent } from './componentes/instrumento-list/instrumento-list.component';
import { GruposListComponent } from './componentes/grupos-list/grupos-list.component';
import { ArtistaListComponent } from './componentes/artista-list/artista-list.component';
import { ArtistaGrupoListComponent } from './componentes/artista-grupo-list/artista-grupo-list.component';


//Importamos los Formularios
import { PaisFormComponent } from './componentes/pais-form/pais-form.component';
import { InstrumentoFormComponent } from './componentes/instrumento-form/instrumento-form.component';
import { GruposFormComponent } from './componentes/grupos-form/grupos-form.component';
import { ArtistaFormComponent } from './componentes/artista-form/artista-form.component';
import { ArtistaGrupoFormComponent } from './componentes/artista-grupo-form/artista-grupo-form.component';


const routes: Routes = [
  //Creacion de los Objetos
  
  /* ARTISTA GRUPO */
  {
    path: '',
    redirectTo: '/artista_Grupo',
    pathMatch: 'full'
  },
  {
    path: 'artista_Grupo', //Se creo la ruta para abrir un componente
    component: ArtistaGrupoListComponent
  },
  {
    path: 'artista_Grupo/agregar',
    component: ArtistaGrupoFormComponent,
  },
  {
    path: 'artista_Grupo/actualizar/:Codigo',
    component: ArtistaGrupoFormComponent
  },
  /* ARTISTA */
  {
    path: '',
    redirectTo: '/artista',
    pathMatch: 'full'
  },
  {
    path: 'artista', //Se creo la ruta para abrir un componente
    component: ArtistaListComponent
  },
  {
    path: 'artista/agregar',
    component: ArtistaFormComponent,
  },
  {
    path: 'artista/actualizar/:idArtista',
    component: ArtistaFormComponent
  },
  /* GRUPOS */
  {
    path: '',
    redirectTo: '/grupo',
    pathMatch: 'full'
  },
  {
    path: 'grupo', //Se creo la ruta para abrir un componente
    component: GruposListComponent
  },
  {
    path: 'grupo/agregar',
    component: GruposFormComponent
  },
  {
    path: 'grupo/actualizar/:idGrupo',
    component: GruposFormComponent
  },
  /* INSTRUMENTOS */
  {
    path: '',
    redirectTo: '/instrumento',
    pathMatch: 'full'
  },
  {
    path: 'instrumento', //Se creo la ruta para abrir un componente
    component: InstrumentoListComponent
  },
  {
    path: 'instrumento/agregar',
    component: InstrumentoFormComponent,
  },
  {
    path: 'instrumento/actualizar/:idInstrumento',
    component: InstrumentoFormComponent
  },
  /* PAIS */
  {
    path: '',
    redirectTo: '/pais',
    pathMatch: 'full'
  },
  {
    path: 'pais', //Se creo la ruta para abrir un componente
    component: PaisListComponent
  },
  {
    path: 'pais/agregar',
    component: PaisFormComponent,
  },
  {
    path: 'pais/actualizar/:idPais',
    component: PaisFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
