import { Alumno } from "./alumno.model";
import { Curso } from "./curso.model";

export interface MatriculaRequest{
    alumnoId: number;
    cursoId: number;

}

export interface Matricula{
    id?: number;
    alumno : Alumno;
    curso : Curso;
    fechaMatricula: string;
    estado: string;
}