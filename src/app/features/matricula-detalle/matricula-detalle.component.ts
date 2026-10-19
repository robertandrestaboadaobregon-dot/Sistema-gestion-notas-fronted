import {  ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatriculaService } from '../../core/services/matricula.service';
import { Matricula } from '../../core/models/matricula.model';
import { NotaService } from '../../core/services/nota.service';
import { NotaRequest, NotaResponse, TipoEvaluacion } from '../../core/models/nota.model';
import { AsistenciaService } from '../../core/services/asistencia.service';
import { AsistenciaResponse } from '../../core/models/asistencia.model';
import { ResumenAcademico } from '../../core/models/resumen-academico';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [RouterLink,FormsModule],
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

  notaForm:Partial<NotaRequest> & { tipoEvaluacion:TipoEvaluacion} = {
    tipoEvaluacion: 'PRACTICA',
    valor:undefined,
    peso:undefined,
    observacion: ""
  }



  private route = inject(ActivatedRoute);
  private matriculaService = inject(MatriculaService);
  private notaService = inject(NotaService);
  private asistenciaService = inject(AsistenciaService);

  private cdr = inject(ChangeDetectorRef);


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

guardarNota() {

  const campos : NotaRequest = {
    matriculaId: this.matriculaId,
    tipoEvaluacion: this.notaForm.tipoEvaluacion,
    valor: Number(this.notaForm.valor),
    peso: this.notaForm.peso ? Number(this.notaForm.peso) : undefined,
    observacion: this.notaForm.observacion
  }


  this.notaService.crearNota(campos).subscribe({
    next:() => {
      this.cancelarFormulario();
      this.notaForm  = {tipoEvaluacion:'PRACTICA',valor:undefined,peso:undefined}
      this.cargarNotas();
    }
  })

}



cargarTodo():void{
  this.matriculaService.obtenerPorId(this.matriculaId).subscribe({
    next:(data)=>{
      this.matricula = data
      this.cdr.detectChanges();
    }
  })

  this.cargarNotas();
}
cargarResumen():void{
  this.matriculaService.obtenerResumen(this.matriculaId).subscribe({
    next:(data)=>(this.resumen = data)
  })
}

cargarNotas():void{
  this.notaService.listarPorMatricula(this.matriculaId).subscribe({
    next:(data)=> {
      console.log(data)
      this.notas = data}
  })

}

cargarAsistencias():void{
 this.asistenciaService.listarPorMatricula(this.matriculaId).subscribe({
  next:(data) =>(this.asistencias = data)
 })
}

}
