export interface Alumno {
  id?:              number;
  codigo:          string;
  nombres:         string;
  apellidos:       string;
  dni:             string;
  email:           string;
  fechaNacimiento: string;
  estado?:          string;
}

export const DNI = /^[0-9]+([.][0-9]+)?$/

