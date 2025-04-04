import { IsBoolean, IsDate, IsDateString, IsNumber, IsString, IsUrl , IsObject } from "class-validator";
import { SuscripcionEntity } from "src/suscripciones/entities/suscripcion.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { IsNull } from "typeorm";

export class CreateUsuarioSuscripcionesDto {
        id?: number;

        @IsDateString()
        fechaInicioSuscripcion?: Date;
        @IsDateString()
        fechaFinSuscripcion?: Date;
        @IsNumber()
        cambiosRestantes: number;

        fechaEntrega?: Date;
        @IsString()
        estatus: string
        @IsUrl()
        comprobantePago: string; 
        @IsObject()
        user: UserEntity;
        @IsObject()
        suscription: SuscripcionEntity;



} 
