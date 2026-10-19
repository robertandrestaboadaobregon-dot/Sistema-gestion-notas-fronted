import {  Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatriculaService } from '../../core/services/matricula.service';
import { Matricula } from '../../core/models/matricula.model';
import { NotaService } from '../../core/services/nota.service';
import { NotaResponse } from '../../core/models/nota.model';
import { AsistenciaService } from '../../core/services/asistencia.service';
import { AsistenciaResponse } from '../../core/models/asistencia.model';
import { ResumenAcademico } from '../../core/models/resumen-academico';

@Component({
  imports: [RouterLink],
  selector: 'app-matricula-detalle',
  templateUrl: './matricula-detalle.component.html',
})
export class Matriculadetalle implements OnInit{

  matriculaId!:number;
  matricula:Matricula | null = null;
  resumen:ResumenAcademico | null = null;
  notas : NotaResponse[]  = [];
  asistencias:AsistenciaResponse[] = [];
  mostrarform:boolean = false;



  private route = inject(ActivatedRoute);
  private matriculaService = inject(MatriculaService);
  private notaService = inject(NotaService);
  private asistenciaService = inject(AsistenciaService);


  ngOnInit(): void {
   this.matriculaId = Number(this.route.snapshot.paramMap.get('id'));
   this.cargarTodo();

}
mostrarFormulario(){
  this.mostrarform = true;
}

cancelarFormulario(){
  this.mostrarform = false;

}

cargarTodo():void{
  this.matriculaService.obtenerPorId(this.matriculaId).subscribe({
    next:(data)=>{
      this.matricula = data

    }
  })
}
cargarResumen():void{
  this.matriculaService.obtenerResumen(this.matriculaId).subscribe({
    next:(data)=>(this.resumen = data)
  })
}

cargarNotas():void{
  this.notaService.listarPorMatricula(this.matriculaId).subscribe({
    next:(data)=> (this.notas = data)
  })

}

cargarAsistencias():void{
 this.asistenciaService.listarPorMatricula(this.matriculaId).subscribe({
  next:(data) =>(this.asistencias = data)
 })
}

}
