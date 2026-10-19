import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AlumnoService } from '../../core/services/alumno.service';
import { Alumno, DNI } from '../../core/models/alumno.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { title } from 'process';
import { text } from 'stream/consumers';
import { ToastService } from '../../shared/toast/toast.service';

@Component({
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
})
export class Alumnos implements OnInit {

  alumnos : Alumno[] = []
  error = ""

  // inyeccion de dependencia de forma actualizada

  private fb = inject(FormBuilder)


 confirmDelete :Alumno | null = null;
  mostrarForm = false;
  editandoId: number | null = null

  //formulario:Alumno = this.formVacio()



  formularioBuilder = this.fb.group(
    {
      codigo:[{value: this.generarCodigo(), disabled:true}],
      dni:['', [Validators.required, Validators.pattern(DNI)]],
      nombres:['', Validators.required],
      apellidos:['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento:['']
    }
  )
  constructor(private  alumnoService:AlumnoService,
    private cdr: ChangeDetectorRef,
    private toastService:ToastService
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

  editar(alumno:Alumno){
      this.formularioBuilder.reset();
      this.formularioBuilder.patchValue(alumno)
      this.editandoId = alumno.id ?? null
      this.mostrarForm = true
  }

  guardar():void{
    // validamos que el form este valido
    if(this.formularioBuilder.invalid) return;

    this.error = ''
    const asEdicion = !!this.editandoId;// esto convierte a cualquier valor en booleano
    const valor : any = {...this.formularioBuilder.getRawValue()}// todos sus valores
    const accion = this.editandoId ?
    this.alumnoService.actualizar(this.editandoId,valor) :

    this.alumnoService.crear(valor);
      accion.subscribe({
        next:()=>{
          this.cerrarForm()
          this.cargar()
          this.toastService.success(asEdicion ? 'Alumno actualizado correctamente' : 'Alumno guardado correctamente')
        },
        error:(err)=> (this.error = err?.error?.message ?? "Ocurrio un error al guardar Alumno")
      })

  }
  cancelarEliminar():void{
    this.confirmDelete = null;
  }

  eliminar(alumno : Alumno):void{
    if(!alumno.id) return;
    this.confirmDelete = alumno;

  }
  confirmarEliminar():void{
    const alumno = this.confirmDelete;

    if (!alumno?.id) return;
      this.alumnoService.eliminar(alumno.id).subscribe({
        next:()=>{
          this.confirmDelete = null;
          this.cargar();
          this.toastService.success("Alumno eliminado correctamente");

        },
        error:()=>{
          this.confirmDelete = null;
          this.toastService.error("Ocurrio un problema al eliminar");
        }
      })

  }


  cargar(){
   this.alumnoService.listar().subscribe({
    next:(data) => {this.alumnos = data;
      this.cdr.detectChanges();
    },
    error:() =>(this.error = "No se pudo cargar la lista de alumnos")
   })
  }
  ngOnInit(): void {
    this.cargar()
  }

  private formVacio():Alumno{
    return{codigo: '',nombres: '',apellidos: '',dni:'',email:'',fechaNacimiento:''};
  }
  //generador de codigos
  private generarCodigo():string{
    const year = new Date().getFullYear();
    const correlative = Math.floor(10000 + Math.random() * 90000)// genera un numero al azar
    return `AL-${year}-${correlative}`;
  }

}
