import { Transform } from "class-transformer";
import { IsEmail, IsNumber, IsString, MinLength } from "class-validator";
import { HijoEntity } from "src/hijo/entities/hijo.entity";

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

    @IsString()
    idiomaInteresHijos?: string;

    @IsString()
    generoInteresHijos?: string;

    @IsString()
    preguntasComentarios?: string;
}
