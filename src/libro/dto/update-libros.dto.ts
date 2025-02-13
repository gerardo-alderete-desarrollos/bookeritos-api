import { PartialType } from '@nestjs/mapped-types';
import { CreateLibroDto } from './create-libros.dto';

export class UpdateLibroDto extends PartialType(CreateLibroDto) {
}
