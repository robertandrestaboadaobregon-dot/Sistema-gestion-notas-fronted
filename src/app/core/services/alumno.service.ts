import { Injectable } from "@angular/core";
import { environment } from "../../../environment/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Alumno } from "../models/alumno.model";

@Injectable({providedIn : 'root'})
export class AlumnoService{

  private readonly baseUrl = `${environment.apiUrl}/alumnos`

  constructor(private http: HttpClient){}
    listar():Observable<Alumno[]>{
      return this.http.get<Alumno[]>(this.baseUrl)
    }
    obtenerPorId(id:number):Observable<Alumno>{
      return this.http.get<Alumno>(`${this.baseUrl}/${id}`)
    }
    crear(alumno:Alumno):Observable<Alumno>{
      return this.http.post<Alumno>(this.baseUrl,alumno)
    }
    actualizar(id:number,alumno:Alumno):Observable<Alumno>{
      return this.http.put<Alumno>(`${this.baseUrl}/${id}`, alumno)
    }
    eliminar(id:number):Observable<void>{
      return this.http.delete<void>(`${this.baseUrl}/${id}`)
    }

    

}
