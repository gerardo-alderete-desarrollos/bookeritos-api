import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, IsObject, IsString , IsEmpty} from "class-validator";
import { AuthorEntity } from "src/author/entities/author.entity";
import { CategoriaEntity } from "src/categoria/entities/categoria.entity";
import { InventarioLibroEntity } from "src/inventario-libros/entities/inventario-libro.entity";
import { IsNull } from "typeorm";

export class CreateLibroDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString() 
    photo: string;

    @IsNotEmpty()
    edad_recomendada: string;

    @IsNotEmpty()
    sinopsis: string;
    
    @IsNotEmpty()
    categorias: CategoriaEntity[];  
    
    @IsNotEmpty()
    author: AuthorEntity;

    inventario: InventarioLibroEntity[];

}
