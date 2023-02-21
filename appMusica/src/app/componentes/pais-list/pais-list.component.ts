import { Component, HostBinding, OnInit } from '@angular/core';
//Importamos el archivo de Pais.service.ts
import { PaisService } from 'src/app/servicios/pais.service';

@Component({
  selector: 'app-pais-list',
  templateUrl: './pais-list.component.html',
  styleUrls: ['./pais-list.component.css']
})
export class PaisListComponent implements OnInit {
  //Se importa el HostBinding
  @HostBinding('class') classes = 'row';
  //Creamos el arreglo vacio llamado paises
  paises: any = [];

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.obtenerPaises();
  }

  obtenerPaises(){
    this.paisService.getPaises().subscribe(
      res => {
        //Llena el arreglo con la respuesta que enviamos
        this.paises = res;
      },
      err => console.error(err)
    );
  }

  borrarPais(idPais: string){
    this.paisService.deletePais(idPais).subscribe(
      res => {
        //Llena el arreglo con la respuesta que enviamos
        console.log(res);
        this.obtenerPaises();
      },
      err => console.error(err)
    );
  }
}
