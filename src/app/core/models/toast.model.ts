
export type ToastTipo = 'success' | 'error' | 'info' | 'warning'

export interface Toast{
  id :number;
  mensaje : string;
  tipo:ToastTipo;
}
