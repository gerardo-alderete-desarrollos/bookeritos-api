import { IsBoolean, IsDate, IsDateString, IsNumber, IsString, IsUrl , IsObject, IsOptional } from "class-validator";
import { SuscripcionEntity } from "src/suscripciones/entities/suscripcion.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { IsNull } from "typeorm";

export class CreateUsuarioSuscripcionesDto {
        id?: number;

        @IsOptional()
        @IsDateString()
        fechaInicioSuscripcion?: Date | null;

        @IsOptional()
        @IsDateString()
        fechaFinSuscripcion?: Date | null;
        @IsNumber()
        cambiosRestantes: number;
 
        @IsString()
        estatus: string
        @IsUrl()
        comprobantePago: string; 
        @IsObject()
        user: UserEntity;
        @IsObject()
        suscription: SuscripcionEntity;

        @IsOptional()
        @IsDateString()
        fechaEntrega?: Date;

        @IsOptional()
        @IsBoolean()
        isFechaEntregaConfirmada: boolean;


} 
