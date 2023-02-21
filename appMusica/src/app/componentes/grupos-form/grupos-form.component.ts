import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; //Para enviar a una ruta Especifica
/* ENTIDAD */
import { Grupos } from 'src/app/modelos/Grupos';
import { GruposService } from 'src/app/servicios/grupos.service';

@Component({
  selector: 'app-grupos-form',
  templateUrl: './grupos-form.component.html',
  styleUrls: ['./grupos-form.component.css']
})
export class GruposFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  grupo: Grupos = {
    idGrupo: 0,
    Nombre: '',
    Origen: '',
    Genero: '',
    Inicio: new Date(),
    Fin: new Date(),
    Sellos: '',
    Estado: '',
    SitioWeb: '',
    Idioma: '',
    Logo: ''
  };

  edit: boolean = false;

  constructor(private Service: GruposService, private router: Router, 
    private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
      const params = this.activatedRoute.snapshot.params;
      if(params['idGrupo']){
        this.Service.getGrupo(params['idGrupo']).subscribe(
          res => {
            console.log(res); //Muestra en consola
            this.grupo = res; //Muestra en el navegador
            this.edit = true; //Asignamos que es verdadero
          },
          err => console.error(err)
        );
      }
    }
  
    add(){
      this.Service.create(this.grupo).subscribe(
        res => {
          //Llenamos el arreglo con la respuesta
          console.log(res);
          this.router.navigate(['grupo']);
        },
        err => console.error(err)
      );
    }
  
    actualiza(){
      const params = this.activatedRoute.snapshot.params;
      this.Service.update(params['idGrupo'], this.grupo).subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/grupo']);
        },
        err => console.error(err)
      );
    }
}
