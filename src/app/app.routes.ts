import { Alumnos } from './features/alumnos/alumnos.component';
import { Routes } from '@angular/router';
export const routes: Routes = [
 {
  path:'',
  redirectTo:'alumnos',
  pathMatch:'full'
 },
 {
  path:'alumnos',
  loadComponent:() => import('./features/alumnos/alumnos.component').then((m) => m.Alumnos)
 },
 {
  path:'profesores',
  loadComponent:() => import('./features/profesores/profesores.component').then((m) => m.Profesores)
 },
 {
  path:'cursos',
  loadComponent:() => import('./features/cursos/cursos.component').then((m) => m.Cursos)
 },
 {
  path:'matriculas',
  loadComponent:() => import('./features/matriculas/matriculas.component').then((m) => m.Matriculas)
 },
 {
    path:'matriculas-detalle/:id', 
    loadComponent:()=> import('./features/matricula-detalle/matricula-detalle.component').then((m) => m.Matriculadetalle)
 }

];
