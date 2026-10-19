export type EstadoAsistencia =
'PRESENTE' | 
'TARDANZA' |
 'AUSENTE' |
 'JUSTIFICADO';

 export interface AsistenciaRequest{
    matriculaId:number;
    fecha:string;
    estado:EstadoAsistencia;
    observacion?:string;

 }
 export interface AsistenciaResponse{
    id?:number;
    matriculaId:number;
    fecha:string;
    estado:EstadoAsistencia;
    observacion?:string
    
 }