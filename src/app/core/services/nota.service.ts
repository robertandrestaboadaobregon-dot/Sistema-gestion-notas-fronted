import { inject, Service } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotaRequest, NotaResponse } from '../models/nota.model';

@Service()
export class NotaService {
    private readonly baseUrl = `${environment.apiUrl}/notas`;

    private http = inject(HttpClient);

    listarPorMatricula(matriculaId:number):Observable<NotaResponse[]>{
        return this.http.get<NotaResponse[]>(`${this.baseUrl}/matricula/${matriculaId}`)

    } 

    crearNota(nota:NotaRequest):Observable<NotaResponse>{
        return this.http.post<NotaResponse>(this.baseUrl,nota);
    }

    actualizarNota(id:number,nota:NotaRequest):Observable<NotaResponse>{
        return this.http.put<NotaResponse>(`${this.baseUrl}/${id}`,nota);
    }

    eliminarNota(id:number):Observable<void>{
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}
