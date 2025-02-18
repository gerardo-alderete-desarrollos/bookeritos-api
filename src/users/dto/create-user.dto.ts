import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsNumber, IsString, MinLength } from "class-validator";
import { CategoriaEntity } from "src/categoria/entities/categoria.entity";
import { HijoEntity } from "src/hijo/entities/hijo.entity";
import { IdiomaEntity } from "src/idiomas/entities/idioma.entity";
import { UpdateInventarioLibroDto } from "src/inventario-libros/dto/update-inventario-libro.dto";
import { InventarioLibroEntity } from "src/inventario-libros/entities/inventario-libro.entity";

export class CreateUserDto {
    @IsEmail()
    email: string;
    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;
    @IsString()
    name?: string;

    @IsNumber()
    edad?: number;

    hijos?: HijoEntity[];

    @IsString()
    rol?: string;

    @IsString()
    direccion?: string;

    @IsString()
    referencias?: string;

    @IsString()
    telefono?: string;

    @IsString()
    ine?: string;

    @IsString()
    comprobanteDomicilio?: string;

    @IsNumber()
    cantidadHijos?: number;

    @IsString()
    nivelLectorHijos?: string;

    idiomasInteres?: IdiomaEntity[];

    generosInteres?: CategoriaEntity[];

    @IsString()
    preguntasComentarios?: string;

    @IsBoolean()
    isProfileComplete?: boolean;
 
    inventario?: InventarioLibroEntity[] | UpdateInventarioLibroDto[];
    
}
