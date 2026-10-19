import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AlumnoService } from '../../core/services/alumno.service';
import { CursoService } from '../../core/services/curso.service';
import { Alumno } from '../../core/models/alumno.model';
import { Curso } from '../../core/models/curso.model';
import { Matricula, MatriculaRequest } from '../../core/models/matricula.model';
import { FormsModule } from '@angular/forms';
import { MatriculaService } from '../../core/services/matricula.service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-matriculas',
  templateUrl: './matriculas.component.html',
})
export class Matriculas implements OnInit {
  mostrarFormulario = false;
  alumnos: Alumno[] = [];
  cursos: Curso[] = [];
  matriculas: Matricula[] = [];

  form: MatriculaRequest = {
    alumnoId: undefined as unknown as number,
    cursoId: undefined as unknown as number,
  };

  // inyectar los servicios de alumno y curso
  private alumnoService = inject(AlumnoService);
  private cursoService = inject(CursoService);
  private matriculaService = inject(MatriculaService);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.cargarAlumno();
    this.cargarCurso();
    this.cargarMatriculas();
  }
  cargarMatriculas() {
    this.matriculaService.listar().subscribe({
      next: (data) => {
        this.matriculas = data
        this.cdr.detectChanges();
      },
      error: () => {
        console.log('hubo un error');
      },
    });
  }

  cargarAlumno() {
    this.alumnoService.listar().subscribe({ next: (data) => (this.alumnos = data) });
  }
  cargarCurso() {
    this.cursoService.listar().subscribe({ next: (data) => {this.cursos = data} });
  }

  guardar() {
    this.matriculaService.crearMatricula(this.form).subscribe({
      next: () => {
        this.mostrarFormulario = false;
        this.form = {
          alumnoId: undefined as unknown as number,
          cursoId: undefined as unknown as number,
        };
      },
    });
  }
  mostrar() {
    this.mostrarFormulario = true;
  }

  cerrarform() {
    this.mostrarFormulario = false;
  }
}
