import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; //Para enviar a una ruta Especifica
/* ENTIDAD */
import { Cancion } from 'src/app/modelos/Canciones';
import { CancionesService } from 'src/app/servicios/canciones.service';

@Component({
  selector: 'app-canciones-form',
  templateUrl: './canciones-form.component.html',
  styleUrls: ['./canciones-form.component.css']
})
export class CancionesFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  cancion: Cancion = {
    idCancion: 0,
    Nombre: '',
    Duracion: '',
    Publicacion: new Date,
    Genero: '',
    Idioma: ''
  };

  edit: boolean = false;

  constructor(private Service: CancionesService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if(params['idCancion']){
      this.Service.getCancion(params['idCancion']).subscribe(
        res => {
          console.log(res); //Muestra en consola
          this.cancion = res; //Muestra en el navegador
          this.edit = true; //Asignamos que es verdadero
        },
        err => console.error(err)
      );
    }
  }

  add(){
    this.Service.create(this.cancion).subscribe(
      res => {
        //Llenamos el arreglo con la respuesta
        console.log(res);
        this.router.navigate(['canciones']);
      },
      err => console.error(err)
    );
  }

  actualiza(){
    const params = this.activatedRoute.snapshot.params;
    this.Service.update(params['idCancion'], this.cancion).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/canciones']);
      },
      err => console.error(err)
    );
  }
}
