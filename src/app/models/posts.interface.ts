import { Autor } from "./autor.interface";


export interface Post {
  _id: string;
  titulo: string;
  descripcion: string;
  imagenUrl: string;
  autor: Autor;
  likes: string[]; 
  eliminado: boolean;
  createdAt: string; 
  updatedAt: string; 
  __v: number;
}
