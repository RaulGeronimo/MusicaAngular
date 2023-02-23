import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; //Para enviar a una ruta Especifica
//Importamos el archivo de .service.ts
import { BuscaCancionAlbumService } from 'src/app/servicios/busca-cancion-album.service';
import { CancionesAlbumService } from 'src/app/servicios/canciones-album.service';

@Component({
  selector: 'app-busca-cancion-album',
  templateUrl: './busca-cancion-album.component.html',
  styleUrls: ['./busca-cancion-album.component.css']
})
export class BuscaCancionAlbumComponent implements OnInit {
  //Se importa el HostBinding
  @HostBinding('class') classes = 'row';
  //Creamos el arreglo vacio llamado Canciones
  Canciones: any = [];

  constructor(private Service: BuscaCancionAlbumService, private router: Router, private activatedRoute: ActivatedRoute, private CancionesAlbumService: CancionesAlbumService) { }

  ngOnInit(): void {
    this.obtenerLista();
  }


  obtenerLista(){
    const params = this.activatedRoute.snapshot.params;
    if(params['idAlbum']){
      this.Service.getCancion(params['idAlbum']).subscribe(
        res => {
          console.log(res); //Muestra en consola
          this.Canciones = res; //Muestra en el navegador
        },
        err => console.error(err)
      );
    }
  }

  borrar(idCancion: string){
    this.CancionesAlbumService.delete(idCancion).subscribe(
      res => {
        //Llena el arreglo con la respuesta que enviamos
        console.log(res);
        this.obtenerLista();
      },
      err => console.error(err)
    );
  }
}