import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { CreateLibroDto } from './create-libros.dto';
import { CategoriaEntity } from 'src/categoria/entities/categoria.entity';

export class UpdateLibroDto extends PartialType(CreateLibroDto) {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Press Francess'})
    name: string;
    @IsString()
    @ApiProperty({ example: 'http://asdf/'})
    photo: string;
    @IsNotEmpty()
    @IsDateString()
    @ApiProperty({ example: '2024-11-10T06:10:10.000Z'})
    updateAt: Date;
    
    @IsNotEmpty()
    categorias: CategoriaEntity[]
}
