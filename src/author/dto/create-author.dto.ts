import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { LibroEntity } from "src/libro/entities/libros.entity";

export class CreateAuthorDto {
    @IsString()
    @IsNotEmpty()
    name: string
    
    @IsNumber()
    edad: number;
 
    @IsString()
    photo: string;

    @IsArray()
    libros: LibroEntity[];
}
