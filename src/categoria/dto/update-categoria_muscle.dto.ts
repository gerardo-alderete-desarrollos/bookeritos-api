import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { CreateCategoriaDto } from './create-categoria_muscle.dto';
import { LibroEntity } from 'src/libro/entities/libros.entity';

export class UpdateCategoriaDto extends PartialType(CreateCategoriaDto) {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Piernas'})
    name: string;

    @IsString()
    @ApiProperty({ example: 'http://asdf/s'})
    photo: string;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({ example: '2024-11-10T06:20:10.000Z'})
    updateAt: Date;

    @IsNotEmpty()
    libros: LibroEntity[]
}
 