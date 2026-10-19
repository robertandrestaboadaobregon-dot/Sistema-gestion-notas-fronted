import { ToastService } from './../toast.service';
import { Component, inject } from '@angular/core';
import { ToastTipo } from '../../../core/models/toast.model';


const ESTILOS_POR_TIPO  : Record<ToastTipo, {bg:string,icono:string}> = {
  success: { bg : 'bg-green-600', icono: '✔'},
  error : { bg : 'bg-red-600', icono: '✖'},
  warning : { bg : 'bg-amber-600', icono: '！'},
  info : { bg : 'bg-blue-600', icono: 'ⅰ'},
}

@Component({
  selector: 'toastApp',
  imports: [],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.css',
})
export class ToastContainerComponent {

  // inyeccion por dependencia
  protected readonly toastService = inject(ToastService);

  protected readonly estilos = ESTILOS_POR_TIPO;


}
