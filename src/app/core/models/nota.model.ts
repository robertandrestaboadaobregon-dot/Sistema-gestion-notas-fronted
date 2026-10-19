export type TipoEvaluacion = 
'PRACTICA' | 
'TRABAJO' | 
'EXAMEN_PARCIAL' | 
'EXAMEN_FINAL';


export interface NotaRequest{
    matriculaId:number;
    tipoEvaluacion:TipoEvaluacion;
    valor: number;
    peso?:number;
    fecha?:number;
    observacion?:string;
}

export interface NotaResponse{
    id?: number;
    matriculaId: number;
    tipoEvaluacion:TipoEvaluacion;
     valor: number;
    peso?:number;
    fecha?:number;
    observacion?:string;
}