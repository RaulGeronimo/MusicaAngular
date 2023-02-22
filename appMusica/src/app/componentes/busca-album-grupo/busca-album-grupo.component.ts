import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; //Para enviar a una ruta Especifica
//Importamos el archivo de .service.ts
import { BuscaAlbumGrupoService } from 'src/app/servicios/busca-album-grupo.service';
import { AlbumService } from 'src/app/servicios/album.service';

@Component({
  selector: 'app-busca-album-grupo',
  templateUrl: './busca-album-grupo.component.html',
  styleUrls: ['./busca-album-grupo.component.css']
})
export class BuscaAlbumGrupoComponent {
  //Se importa el HostBinding
  @HostBinding('class') classes = 'row';
  //Creamos el arreglo vacio llamado Canciones
  Album: any = [];

  constructor(private Service: BuscaAlbumGrupoService, private activatedRoute: ActivatedRoute, private AlbumService: AlbumService) { }

  ngOnInit(): void {
    this.obtenerLista();
  }


  obtenerLista(){
    const params = this.activatedRoute.snapshot.params;
    if(params['idGrupo']){
      this.Service.getAlbum(params['idGrupo']).subscribe(
        res => {
          console.log(res); //Muestra en consola
          this.Album = res; //Muestra en el navegador
        },
        err => console.error(err)
      );
    }
  }

  borrar(idAlbum: string){
    this.AlbumService.delete(idAlbum).subscribe(
      res => {
        //Llena el arreglo con la respuesta que enviamos
        console.log(res);
        this.obtenerLista();
      },
      err => console.error(err)
    );
  }
}
