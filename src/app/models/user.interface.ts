export interface User {
    
    "tipoPerfil": string,
    "descripcion": string,
    "_id": string,
    "username": string,
    "email": string,
    "password": string,
    "nombre": string,
    "apellido": string,
    "imagenPerfil": string,
    "isActive": boolean,
    "createdAt": string,
    "updatedAt": string,
    "fechaNacimiento": string
}

export const UsuarioEjemplo: User = {
  _id: "6858beb2bc0a1b0ae7da77de",
  password: "",
  username: "testuser",
  email: "test@gmail.com",
  nombre: "Usuario",
  apellido: "Prueba",
  imagenPerfil: "/uploads/imagen-1751218915664-604533924.jpg",
  tipoPerfil: "usuario",
  isActive: true,
  fechaNacimiento: "2010-01-01T00:00:00.000Z",
  descripcion: "Soy un usuario de prueba, si no se pudo cargar el usuario normal",
  createdAt: "2025-06-23T02:40:50.399Z",
  updatedAt: "2025-06-23T02:40:50.399Z"
};