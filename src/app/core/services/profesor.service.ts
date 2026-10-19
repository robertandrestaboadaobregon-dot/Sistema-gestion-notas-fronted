import { Injectable } from "@angular/core";
import { environment } from "../../../environment/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Profesor } from "../models/profesor.model";

@Injectable({ providedIn: 'root' })
export class ProfesorService {

  private readonly baseUrl = `${environment.apiUrl}/profesores`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(this.baseUrl);
  }

  obtenerPorId(id: number): Observable<Profesor> {
    return this.http.get<Profesor>(`${this.baseUrl}/${id}`);
  }

  crear(profesor: Profesor): Observable<Profesor> {
    return this.http.post<Profesor>(this.baseUrl, profesor);
  }

  actualizar(id: number, profesor: Profesor): Observable<Profesor> {
    return this.http.put<Profesor>(`${this.baseUrl}/${id}`, profesor);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}