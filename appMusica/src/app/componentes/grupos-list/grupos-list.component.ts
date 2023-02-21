import { Component, HostBinding, OnInit } from '@angular/core';
//Importamos el archivo de Artista.service.ts
import { GruposService } from 'src/app/servicios/grupos.service';

@Component({
  selector: 'app-grupos-list',
  templateUrl: './grupos-list.component.html',
  styleUrls: ['./grupos-list.component.css']
})
export class GruposListComponent implements OnInit {
   //Se importa el HostBinding
   @HostBinding('class') classes = 'row';
   //Creamos el arreglo vacio llamado Grupos
   Grupos: any = [];
 
   constructor(private Service: GruposService) { }
 
   ngOnInit(): void {
     this.obtenerLista();
   }
 
   obtenerLista(){
     this.Service.getGrupos().subscribe(
       res => {
         //Llena el arreglo con la respuesta que enviamos
         this.Grupos = res;
       },
       err => console.error(err)
     );
   }
 
   borrar(idGrupo: string){
     this.Service.delete(idGrupo).subscribe(
       res => {
         //Llena el arreglo con la respuesta que enviamos
         console.log(res);
         this.obtenerLista();
       },
       err => console.error(err)
     );
   }
}
