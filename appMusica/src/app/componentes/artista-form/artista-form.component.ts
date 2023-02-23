import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; //Para enviar a una ruta Especifica
import { Artista } from 'src/app/modelos/Artista';
import { ArtistaService } from 'src/app/servicios/artista.service';
//Llave Foranea
import { PaisService } from 'src/app/servicios/pais.service';

@Component({
  selector: 'app-artista-form',
  templateUrl: './artista-form.component.html',
  styleUrls: ['./artista-form.component.css']
})
export class ArtistaFormComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  artista: Artista = {
    idArtista: 0,
    Nombre: '',
    NombreArtistico: '',
    Genero: '',
    FechaNacimiento: new Date(),
    FechaFinado: '',
    Estatura: 0,
    idNacionalidad: 0,
    Instrumentos: '',
    TipoVoz: '',
    Foto: ''
  };
  Pais: any = [];
  edit: boolean = false;

  constructor(private Service: ArtistaService, private paisService: PaisService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.obtenerPais();
    const params = this.activatedRoute.snapshot.params;
    if(params['idArtista']){
      this.Service.getArtista(params['idArtista']).subscribe(
        res => {
          console.log(res); //Muestra en consola
          this.artista = res; //Muestra en el navegador
          this.edit = true; //Asignamos que es verdadero
        },
        err => console.error(err)
      );
    }
  }

  add(){
    this.Service.create(this.artista).subscribe(
      res => {
        //Llenamos el arreglo con la respuesta
        console.log(res);
        this.router.navigate(['artista']);
      },
      err => console.error(err)
    );
  }

  actualiza(){
    const params = this.activatedRoute.snapshot.params;
    this.Service.update(params['idArtista'], this.artista).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/artista']);
      },
      err => console.error(err)
    );
  }

  obtenerPais(){
    this.paisService.getPaises().subscribe(
      res => {
        //Llena el arreglo con la respuesta que enviamos
        this.Pais = res;
      },
      err => console.error(err)
    );
  }
}
