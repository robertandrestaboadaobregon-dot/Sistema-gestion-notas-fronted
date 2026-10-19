
import { Service, signal } from '@angular/core';
import { Toast, ToastTipo } from '../../core/models/toast.model';
const DURACION_DEFECTO_MS = 3000;

@Service()
export class ToastService {

  // creamos una lista de todos los toast activos
  private readonly _toast = signal<Toast[]>([]

  );

// version de solo lectura para que los componentes consuman
  readonly toasts = this._toast.asReadonly();


  // contador de id unicos

  private siguientId = 0;

  // temporizador de autocierre indexados por id de toast

  private timeouts = new Map<number,ReturnType<typeof setTimeout>>();

  /*
  Muestra un toast del tipo indicado y devuelve su id
  su duracion es mayor a 0 se cierra solo pasado ese tiempo ;
  con 0 queda fijo hasta llamar al dismiss

   */

  show(mensaje:string,tipo:ToastTipo = 'info',duracionMs = DURACION_DEFECTO_MS):number{
    const id = this.siguientId++;

    this._toast.update((toast)=>[...toast, {id,mensaje,tipo}])

    if (duracionMs > 0) {
      const timeoutId = setTimeout(() => this.dismiss(id),duracionMs)
      this.timeouts.set(id,timeoutId);
    }

    return id;

  }

  /*
  atajo para mostrar un toast de exito
   */

  success(mensaje:string,duracionMs?:number):number{
    return this.show(mensaje,'success',duracionMs)
  }

  /*
  atajo para mostrar un toast de error
   */
  error(mensaje:string,duracionMs?:number):number{
    return this.show(mensaje,'error',duracionMs)
  }

  /*
   atajo para mostrar un toast de info
   */
  info(mensaje:string,duracionMs?:number):number{
    return this.show(mensaje,'info',duracionMs)
  }
  /*
   atajo para mostrar un toast de advertencia
   */

 warning(mensaje:string,duracionMs?:number):number{
    return this.show(mensaje,'warning',duracionMs)
  }
  /*
  cierra el toast con ese id que se genera y
  cancela su temporizador de autocierre si existe
   */

  dismiss(id:number){
    this._toast.update((toasts) => toasts.filter((t) => t.id !== id) );
    const timeoutId = this.timeouts.get(id);

    if (timeoutId) {
      clearTimeout(timeoutId);
      this.timeouts.delete(id);

    }
  }

}
