import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; //Para enviar a una ruta Especifica

//Importamos el archivo de Artista.service.ts
import { ArtistaGrupoService } from 'src/app/servicios/artista-grupo.service';

@Component({
  selector: 'app-artista-grupo-list',
  templateUrl: './artista-grupo-list.component.html',
  styleUrls: ['./artista-grupo-list.component.css']
})
export class ArtistaGrupoListComponent implements OnInit {
  //Se importa el HostBinding
  @HostBinding('class') classes = 'row';
  //Creamos el arreglo vacio llamado artistas
  artistas: any = [];

  constructor(private Service: ArtistaGrupoService, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerLista();
  }

  obtenerLista(){
    this.Service.getArtistas().subscribe(
      res => {
        //Llena el arreglo con la respuesta que enviamos
        this.artistas = res;
      },
      err => console.error(err)
    );
  }

  borrar(Codigo: string){
    this.Service.delete(Codigo).subscribe(
      res => {
        //Llena el arreglo con la respuesta que enviamos
        console.log(res);
        this.obtenerLista();
      },
      err => console.error(err)
    );
  }
    
}
