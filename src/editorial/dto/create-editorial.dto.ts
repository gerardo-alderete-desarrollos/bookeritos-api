import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { LibroEntity } from "src/libro/entities/libros.entity";

export class CreateEditorialDto {
    @IsString()
    @IsNotEmpty()
    name: string
    
    @IsString()
    photo: string;

    @IsArray()
    libros: LibroEntity[]

}
