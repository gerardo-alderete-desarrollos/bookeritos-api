import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";
import { LibroEntity } from "src/libro/entities/libros.entity";

export class CreateCategoriaDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Pierna'})
    name: string;

    @IsString()
    @ApiProperty({ example: 'http://asdf/'})
    photo: string;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({ example: '2024-11-10T06:11:10.000Z'})
    updateAt: Date;

    @IsNotEmpty()
    libros: LibroEntity[]
}
 