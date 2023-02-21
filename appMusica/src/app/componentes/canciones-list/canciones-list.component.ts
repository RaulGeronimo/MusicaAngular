import { Component, HostBinding, OnInit } from '@angular/core';
//Importamos el archivo de .service.ts
import { CancionesService } from 'src/app/servicios/canciones.service';

@Component({
  selector: 'app-canciones-list',
  templateUrl: './canciones-list.component.html',
  styleUrls: ['./canciones-list.component.css']
})
export class CancionesListComponent implements OnInit {
  //Se importa el HostBinding
  @HostBinding('class') classes = 'row';
  //Creamos el arreglo vacio llamado Canciones
  Canciones: any = [];

  constructor(private Service: CancionesService) { }

  ngOnInit(): void {
    this.obtenerLista();
  }

  obtenerLista(){
    this.Service.getCanciones().subscribe(
      res => {
        //Llena el arreglo con la respuesta que enviamos
        this.Canciones = res;
      },
      err => console.error(err)
    );
  }

  borrar(idCancion: string){
    this.Service.delete(idCancion).subscribe(
      res => {
        //Llena el arreglo con la respuesta que enviamos
        console.log(res);
        this.obtenerLista();
      },
      err => console.error(err)
    );
  }
}
