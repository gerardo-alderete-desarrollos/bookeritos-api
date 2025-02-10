import { IsBoolean, IsDate, IsDateString, IsNumber } from "class-validator";

export class CreateUsuarioSuscripcionesDto {
        @IsDateString()
        fechaFinSuscripcion: Date;
        @IsNumber()
        userId: number;
        @IsNumber()
        suscripcionId: number;
        @IsBoolean()
        estatus: boolean;
} 
