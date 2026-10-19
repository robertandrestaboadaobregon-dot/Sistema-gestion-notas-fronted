import { inject, Service } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AsistenciaRequest, AsistenciaResponse } from '../models/asistencia.model';

@Service()
export class AsistenciaService {
    private readonly baseUrl = `${environment.apiUrl}/asistencias`;

    private http = inject(HttpClient);

    listarPorMatricula(matriculaId:number):Observable<AsistenciaResponse[]>{
        return this.http.get<AsistenciaResponse[]>(`${this.baseUrl}/matricula/${matriculaId}`);
    }

    crear(asistencia:AsistenciaRequest):Observable<AsistenciaResponse>{
        return this.http.post<AsistenciaResponse>(this.baseUrl,asistencia);
    }

    actualizar(id:number,asistencia:AsistenciaRequest):Observable<AsistenciaResponse>{
        return this.http.put<AsistenciaResponse>(`${this.baseUrl}/${id}`,asistencia);
    }
    eliminar(id:number):Observable<void>{
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
