import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Curso, CursoRequest } from '../../core/models/curso.model';
import { FormsModule } from '@angular/forms';
import { Profesor } from '../../core/models/profesor.model';
import { ProfesorService } from '../../core/services/profesor.service';
import { CursoService } from '../../core/services/curso.service';
import { ToastService } from '../../shared/toast/toast.service';

@Component({
  imports: [FormsModule],
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
})
export class Cursos implements OnInit {

  cursos: Curso[] = [];
  profesores: Profesor[] = [];

  mostrarFormulario = false;
  editandoId: number | null = null;
  confirmDelete: Curso | null = null;

  form: CursoRequest = this.formVacio();

  private serviceProfesor = inject(ProfesorService);
  private serviceCurso = inject(CursoService);
  private toastService = inject(ToastService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.cargar();
    this.cargarProfesores();
  }

  // Abrir formulario para nuevo curso
  mostrar(): void {
    this.form = this.formVacio();
    this.form.codigo = this.generarCodigo();
    this.editandoId = null;
    this.mostrarFormulario = true;
  }

  // Abrir formulario para editar
  editar(curso: Curso): void {
    this.form = {
      codigo: curso.codigo,
      nombre: curso.nombre,
      credito: curso.credito,
      profesorId: curso.profesor?.id ?? 0
    };

    this.editandoId = curso.id ?? null;
    this.mostrarFormulario = true;
  }

  // Guardar o actualizar
  guardar(): void {

    const asEdicion = !!this.editandoId;

    const accion = this.editandoId
      ? this.serviceCurso.actualizarCurso(this.editandoId, this.form)
      : this.serviceCurso.crearCurso(this.form);

    accion.subscribe({
      next: () => {

        this.cerrarForm();
        this.cargar();

        this.toastService.success(
          asEdicion
            ? 'Curso actualizado correctamente'
            : 'Curso guardado correctamente'
        );
      },

      error: (err) => {
        console.log(err);
        this.toastService.error(
          'Ocurrió un error al guardar el curso'
        );
      }
    });
  }

  // Cerrar formulario
  cerrarForm(): void {
    this.mostrarFormulario = false;
    this.editandoId = null;
  }

  // Cargar cursos
  cargar(): void {
    this.serviceCurso.listar().subscribe({
      next: (data) => {
        this.cursos = data;
        this.cdr.detectChanges();
      },

      error: (err) => {
        console.log(err);
        this.toastService.error(
          'No se pudo cargar la lista de cursos'
        );
      }
    });
  }

  // Cargar profesores
  cargarProfesores(): void {
    this.serviceProfesor.listar().subscribe({
      next: (data) => {
        this.profesores = data;
      },

      error: () => {
        console.log('Hubo un error al cargar profesores');
      }
    });
  }

  // Mostrar confirmación de eliminación
  eliminar(curso: Curso): void {
    if (!curso.id) return;

    this.confirmDelete = curso;
  }

  // Cancelar eliminación
  cancelarEliminar(): void {
    this.confirmDelete = null;
  }

  // Confirmar eliminación
  confirmarEliminar(): void {

    const curso = this.confirmDelete;

    if (!curso?.id) return;

    this.serviceCurso.eliminarCurso(curso.id).subscribe({

      next: () => {

        this.confirmDelete = null;
        this.cargar();

        this.toastService.success(
          'Curso eliminado correctamente'
        );
      },

      error: (err) => {

        console.log(err);
        this.confirmDelete = null;

        this.toastService.error(
          'Ocurrió un problema al eliminar el curso'
        );
      }
    });
  }

  formVacio(): CursoRequest {
    return {
      codigo: '',
      nombre: '',
      credito: 3,
      profesorId: undefined as unknown as number
    };
  }

  // Generador de códigos
  private generarCodigo(): string {

    const year = new Date().getFullYear();

    const correlative =
      Math.floor(10000 + Math.random() * 90000);

    return `CRS-${year}-${correlative}`;
  }
}
