import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; //Para enviar a una ruta Especifica
//Importamos el archivo de .service.ts
import { BuscaCancionGrupoService } from 'src/app/servicios/busca-cancion-grupo.service';
import { CancionesService } from 'src/app/servicios/canciones.service';

@Component({
  selector: 'app-busca-cancion-grupo',
  templateUrl: './busca-cancion-grupo.component.html',
  styleUrls: ['./busca-cancion-grupo.component.css']
})
export class BuscaCancionGrupoComponent implements OnInit {
  //Se importa el HostBinding
  @HostBinding('class') classes = 'row';
  //Creamos el arreglo vacio llamado Canciones
  Canciones: any = [];

  constructor(private Service: BuscaCancionGrupoService, private router: Router, private activatedRoute: ActivatedRoute, private CancionesAlbumService: CancionesService) { }

  ngOnInit(): void {
    this.obtenerLista();
  }


  obtenerLista(){
    const params = this.activatedRoute.snapshot.params;
    if(params['idGrupo']){
      this.Service.getCancion(params['idGrupo']).subscribe(
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
