import { Component, HostBinding, OnInit } from '@angular/core';
//Importamos el archivo de Instrumentos.service.ts
import { InstrumentosService } from 'src/app/servicios/instrumentos.service';

@Component({
  selector: 'app-instrumento-list',
  templateUrl: './instrumento-list.component.html',
  styleUrls: ['./instrumento-list.component.css']
})
export class InstrumentoListComponent implements OnInit {
  //Se importa el HostBinding
  @HostBinding('class') classes = 'row';
  //Creamos el arreglo vacio llamado paises
  instrumentos: any = [];

  constructor(private instrumentosService: InstrumentosService) { }

  ngOnInit(): void {
    this.obtenerInstrumentos();
  }

  obtenerInstrumentos(){
    this.instrumentosService.getInstrumentos().subscribe(
      res => {
        //Llena el arreglo con la respuesta que enviamos
        this.instrumentos = res;
      },
      err => console.error(err)
    );
  }

  borrarInstrumento(idInstrumento: string){
    this.instrumentosService.deleteInstrumento(idInstrumento).subscribe(
      res => {
        //Llena el arreglo con la respuesta que enviamos
        console.log(res);
        this.obtenerInstrumentos();
      },
      err => console.error(err)
    );
  }
}
