import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsDecimal, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { AuthorEntity } from "src/author/entities/author.entity";
import { CategoriaEntity } from "src/categoria/entities/categoria.entity";
import { EditorialEntity } from "src/editorial/entities/editorial.entity";

export class CreateLibroDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Press Frances'})
    name: string;

    @IsString() 
    @ApiProperty({ example: 'http://asdf/s'})
    photo: string;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({ example: '2024-11-10T06:20:10.000Z'})
    updateAt: Date;

    @IsNotEmpty()
    categorias: CategoriaEntity[];

    @IsNotEmpty()
    editorial: EditorialEntity;
    @IsNotEmpty()
    author: AuthorEntity;

    @IsNotEmpty()
    paginas: number

    @IsNotEmpty()
    year_publicacion: number;

    @IsNotEmpty()
    edicion: number;

    @IsNotEmpty()
    idioma: string;

    @IsNotEmpty()
    edad_recomendada: string;

    @IsNotEmpty()
    precio_original: number;

    @IsNotEmpty()
    precio_final: number;

    @IsNotEmpty()
    proveedor: string;

    @IsDateString()
    @IsNotEmpty()
    fecha_compra: Date;

    @IsNotEmpty()
    llego_compra: boolean;

    @IsNotEmpty()
    estatus_renta: string;

}
