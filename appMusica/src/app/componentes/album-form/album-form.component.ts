import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; //Para enviar a una ruta Especifica
/* ENTIDAD */
import { Album } from 'src/app/modelos/Album';
import { AlbumService } from 'src/app/servicios/album.service';
/* LLAVE FORANEA */
import { GruposService } from 'src/app/servicios/grupos.service';
import { DisqueraService } from 'src/app/servicios/disquera.service';

@Component({
  selector: 'app-album-form',
  templateUrl: './album-form.component.html',
  styleUrls: ['./album-form.component.css']
})
export class AlbumFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  album: Album = {
    idAlbum: 0,
    idGrupo: 0,
    idDisquera: 0,
    Nombre: '',
    Duracion: '',
    Lanzamiento: new Date(),
    Grabacion: '',
    Genero: '',
    Portada: ''
  };
  edit: boolean = false;

  Grupo: any = [];
  Disquera: any = [];

  constructor(private Service: AlbumService, private GruposService:GruposService, private DisqueraService:DisqueraService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerDisquera();
    this.obtenerGrupo();
    const params = this.activatedRoute.snapshot.params;
    if(params['idAlbum']){
      this.Service.getAlbum(params['idAlbum']).subscribe(
        res => {
          console.log(res); //Muestra en consola
          this.album = res; //Muestra en el navegador
          this.edit = true; //Asignamos que es verdadero
        },
        err => console.error(err)
      );
    }
  }

  add(){
    this.Service.create(this.album).subscribe(
      res => {
        //Llenamos el arreglo con la respuesta
        console.log(res);
        this.router.navigate(['album']);
      },
      err => console.error(err)
    );
  }

  actualiza(){
    const params = this.activatedRoute.snapshot.params;
    this.Service.update(params['idAlbum'], this.album).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/album']);
      },
      err => console.error(err)
    );
  }

  obtenerGrupo(){
    this.GruposService.getGrupos().subscribe(
      res => {
        //Llena el arreglo con la respuesta que enviamos
        this.Grupo = res;
      },
      err => console.error(err)
    );
  }

  obtenerDisquera(){
    this.DisqueraService.getDisqueras().subscribe(
      res => {
        //Llena el arreglo con la respuesta que enviamos
        this.Disquera = res;
      },
      err => console.error(err)
    );
  }
}