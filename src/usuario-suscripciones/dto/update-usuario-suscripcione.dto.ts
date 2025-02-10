import { PartialType } from '@nestjs/swagger';
import { CreateUsuarioSuscripcionesDto } from './create-usuario-suscripcione.dto';

export class UpdateUsuarioSuscripcioneDto extends PartialType(CreateUsuarioSuscripcionesDto) {}
