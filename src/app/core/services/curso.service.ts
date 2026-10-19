import { Service, inject } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';
import { Curso, CursoRequest } from '../models/curso.model';

@Service()
export class CursoService {
  private readonly baseUrl = `${environment.apiUrl}/cursos`;

 private http = inject(HttpClient);

 listar():Observable<Curso[]>{
  return this.http.get<Curso[]>(this.baseUrl);
 }

 obtenerPorId(id:number):Observable<Curso>{
  return this.http.get<Curso>(`${this.baseUrl}/${id}`)
 }

 crearCurso(curso:CursoRequest):Observable<Curso>{
  return this.http.post<Curso>(this.baseUrl, curso)
 }
 actualizarCurso(id:number,curso:CursoRequest):Observable<Curso>{
  return this.http.put<Curso>(`${this.baseUrl}/${id}`,curso)
 }
 eliminarCurso(id:number):Observable<void>{
  return this.http.delete<void>(`${this.baseUrl}/${id}`);
 }


}
