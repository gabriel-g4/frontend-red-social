export enum TipoUsuario {
    ADMIN = "administrador",
    USER = "usuario"
}

export interface RegisterModel {
    username: string,
    email: string,
    nombre: string,
    apellido: string,
    password: string,
    fechaNacimiento: string,
    imagenPerfil?: File,
    descripcion?: string,
    tipoPerfil: TipoUsuario
}

