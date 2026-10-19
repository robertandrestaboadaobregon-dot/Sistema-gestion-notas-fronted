import { inject, Service } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Matricula, MatriculaRequest } from '../models/matricula.model';
import { ResumenAcademico } from '../models/resumen-academico';

@Service()
export class MatriculaService {
    private readonly baseUrl = `${environment.apiUrl}/matriculas`;
    private http = inject(HttpClient);

    listar():Observable<Matricula[]>{
        return this.http.get<Matricula[]>(this.baseUrl);
    }
    obtenerPorId(id:number):Observable<Matricula>{
        return this.http.get<Matricula>(`${this.baseUrl}/${id}`);
    }

    crearMatricula(matricula:MatriculaRequest):Observable<Matricula>{
        return this.http.post<Matricula>(this.baseUrl,matricula);
    }

    eliminar(id:number):Observable<void>{
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }

    obtenerResumen(id:number):Observable<ResumenAcademico>{
        return this.http.get<ResumenAcademico>(`${this.baseUrl}/${id}/resumen`);

    }
}
