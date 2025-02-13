import { PartialType } from '@nestjs/swagger';
import { CreateInventarioLibroDto } from './create-inventario-libro.dto';

export class UpdateInventarioLibroDto extends PartialType(CreateInventarioLibroDto) {}
