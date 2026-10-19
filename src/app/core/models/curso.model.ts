import { Profesor } from "./profesor.model";

export interface CursoRequest{
  codigo: string;
  nombre: string;
  credito: number;
  profesorId: number;
};

export interface Curso{
  id?: number;
  codigo: string;
  nombre : string;
  credito : number;
  profesor:Profesor;
  estado? :string;


}
