import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; //Para enviar a una ruta Especifica
//Importamos el archivo de .service.ts
import { BuscaIntegrantesGrupoService } from 'src/app/servicios/busca-integrantes-grupo.service';
import { ArtistaGrupoService } from 'src/app/servicios/artista-grupo.service'; 


@Component({
  selector: 'app-busca-integrantes-grupo',
  templateUrl: './busca-integrantes-grupo.component.html',
  styleUrls: ['./busca-integrantes-grupo.component.css']
})
export class BuscaIntegrantesGrupoComponent implements OnInit {
  //Se importa el HostBinding
  @HostBinding('class') classes = 'row';
  //Creamos el arreglo vacio llamado Canciones
  artistas: any = [];

  constructor(private Service: BuscaIntegrantesGrupoService, private router: Router, private activatedRoute: ActivatedRoute, private ArtistaGrupoService: ArtistaGrupoService) { }

  ngOnInit(): void {
    this.obtenerLista();
  }


  obtenerLista(){
    const params = this.activatedRoute.snapshot.params;
    if(params['idGrupo']){
      this.Service.getIntegrante(params['idGrupo']).subscribe(
        res => {
          console.log(res); //Muestra en consola
          this.artistas = res; //Muestra en el navegador
        },
        err => console.error(err)
      );
    }
  }

  borrar(idArtista: string){
    this.ArtistaGrupoService.delete(idArtista).subscribe(
      res => {
        //Llena el arreglo con la respuesta que enviamos
        console.log(res);
        this.obtenerLista();
      },
      err => console.error(err)
    );
  }
}
