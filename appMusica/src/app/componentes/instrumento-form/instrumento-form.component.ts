import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; //Para enviar a una ruta Especifica
import { Instrumentos } from 'src/app/modelos/Instrumentos'; 
import { InstrumentosService } from 'src/app/servicios/instrumentos.service';

@Component({
  selector: 'app-instrumento-form',
  templateUrl: './instrumento-form.component.html',
  styleUrls: ['./instrumento-form.component.css']
})
export class InstrumentoFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  instrumentos: Instrumentos = {
    idInstrumento: 0,
    Nombre: '',
    Descripcion: '',
    Foto: ''
  };

  edit: boolean = false;

  constructor(private instrumentosService: InstrumentosService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if(params['idInstrumento']){
      this.instrumentosService.getInstrumento(params['idInstrumento']).subscribe(
        res => {
          console.log(res); //Muestra en consola
          this.instrumentos = res; //Muestra en el navegador
          this.edit = true; //Asignamos que es verdadero
        },
        err => console.error(err)
      );
    }
  }

  add(){
    this.instrumentosService.createInstrumento(this.instrumentos).subscribe(
      res => {
        //Llenamos el arreglo con la respuesta
        console.log(res);
        this.router.navigate(['instrumento']);
      },
      err => console.error(err)
    );
  }

  actualiza(){
    const params = this.activatedRoute.snapshot.params;
    this.instrumentosService.updateInstrumento(params['idInstrumento'], this.instrumentos).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/instrumento']);
      },
      err => console.error(err)
    );
  }
}
