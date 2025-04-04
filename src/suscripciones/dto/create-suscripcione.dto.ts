import { UsuarioSuscripcionEntity } from "src/usuario-suscripciones/entities/usuario-suscripcione.entity";

export class CreateSuscripcioneDto {
        name: string;
    
        precio: number;
    
        descripcion: string;
    
        cantidadLibros?: number;
    
        cambios?: number
    
        users: UsuarioSuscripcionEntity[];
}
