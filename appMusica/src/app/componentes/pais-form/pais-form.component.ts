import { Component, HostBinding, OnInit } from '@angular/core';
import { Pais } from 'src/app/modelos/Pais';
import { PaisService } from 'src/app/servicios/pais.service';
import { ActivatedRoute, Router } from '@angular/router'; //Para enviar a una ruta Especifica

@Component({
  selector: 'app-pais-form',
  templateUrl: './pais-form.component.html',
  styleUrls: ['./pais-form.component.css']
})
export class PaisFormComponent implements OnInit  {

  @HostBinding('class') classes = 'row';

  pais: Pais = {
    idPais: 0,
    Nombre: '',
    Nacionalidad: '',
    Continente: '',
    Bandera: ''
  };

  edit: boolean = false;

  constructor(private paisService: PaisService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if(params['idPais']){
      this.paisService.getPais(params['idPais']).subscribe(
        res => {
          console.log(res); //Muestra en consola
          this.pais = res; //Muestra en el navegador
          this.edit = true; //Asignamos que es verdadero
        },
        err => console.error(err)
      );
    }
  }

  addPais(){
    this.paisService.createPais(this.pais).subscribe(
      res => {
        //Llenamos el arreglo con la respuesta
        console.log(res);
        this.router.navigate(['pais']);
      },
      err => console.error(err)
    );
  }

  actualizaPais(){
    const params = this.activatedRoute.snapshot.params;
    this.paisService.updatePais(params['idPais'], this.pais).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/pais']);
      },
      err => console.error(err)
    );
  }

}
