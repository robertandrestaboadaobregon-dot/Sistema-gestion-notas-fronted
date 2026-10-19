import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Profesor } from '../../core/models/profesor.model';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfesorService } from '../../core/services/profesor.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../shared/toast/toast.service';

@Component({
  imports: [CommonModule,ReactiveFormsModule],
  selector: 'app-profesores',
  templateUrl: './profesores.component.html',
})
export class Profesores  implements OnInit{
  profesores : Profesor[] = []
  error = ""

  private fb = inject(FormBuilder)

   confirmDelete: Profesor | null = null
   mostrarForm = false
   editandoId: number | null = null

   formularioBuilder = this.fb.group(
     {
      codigo:[{value: this.generarCodigo(), disabled:true}],
      especialidad: ['', Validators.required],
      nombres:['', Validators.required],
      apellidos:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],

    }

   )
   constructor (private profesorService:ProfesorService,
    private cdr: ChangeDetectorRef,
    private toastService : ToastService
   ){

   }
   invalido(campo:string):boolean{
    const campos = this.formularioBuilder.get(campo)
    return !!campos && campos.invalid && (campos.dirty || campos.touched)
  }
  abrirNuevo():void{
    this.formularioBuilder.reset()
    //this.formulario = this.formVacio()
    //this.formulario.codigo = this.generarCodigo()
    this.formularioBuilder.patchValue({ codigo : this.generarCodigo()})
    this.editandoId = null
    this.mostrarForm = true;
  }
  cerrarForm(){
    this.mostrarForm = false;
  }
  editar(profesor:Profesor){
    this.formularioBuilder.reset();
      this.formularioBuilder.patchValue(profesor)
      this.editandoId = profesor.id ?? null
      this.mostrarForm = true
  }
    guardar():void{
    // validamos que el form este valido
    if(this.formularioBuilder.invalid) return;

    this.error = ''
    const asEdicion = !!this.editandoId;
    const valor : any = {...this.formularioBuilder.getRawValue()}// todos sus valores
    const accion = this.editandoId ?
    this.profesorService.actualizar(this.editandoId,valor) :

    this.profesorService.crear(valor);
      accion.subscribe({
        next:()=>{
          this.cerrarForm()
          this.cargar()
          this.toastService.success(asEdicion ? 'Profesor actualizado correctamente' : 'Profesor guardado correctamente')
        },
        error:(err)=> (this.error = err?.error?.message ?? "Ocurrio un error al guardar Profesor")
      })

  }

  cancelarEliminar():void{
    this.confirmDelete = null;
  }
  eliminar(profesor : Profesor):void{
      if(!profesor.id) return;
      this.confirmDelete = profesor;

    }
    confirmarEliminar():void{
      const profesor = this.confirmDelete;

      if (!profesor?.id) return;
        this.profesorService.eliminar(profesor.id).subscribe({
          next:()=>{
            this.confirmDelete = null;
            this.cargar();
            this.toastService.success("Profesor eliminado correctamente");

          },
          error:()=>{
            this.confirmDelete = null;
            this.toastService.error("Ocurrio un problema al eliminar");
          }
        })

   }

        cargar(){
   this.profesorService.listar().subscribe({
    next:(data) => {this.profesores = data;
      this.cdr.detectChanges();
    },
    error:() =>(this.error = "No se pudo cargar la lista de profesores")
   })
  }
  ngOnInit(): void {
    this.cargar()
  }

  private formVacio():Profesor{
    return{codigo:'',especialidad:'',nombres:'',apellidos:'',email:''};
   }
   private generarCodigo():string{
    const year = new Date().getFullYear();
    const correlative = Math.floor(10000 + Math.random() * 90000)// genera un numero al azar
    return `PR-${year}-${correlative}`;
  }
   }




