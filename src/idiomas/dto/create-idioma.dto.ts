import { IsNumber, IsString } from "class-validator";
import { LibroEntity } from "src/libro/entities/libros.entity";
import { UserEntity } from "src/users/entities/user.entity";

export class CreateIdiomaDto {
    @IsString()
    name: string;
    @IsNumber()
    edad: number;

    usuarios: UserEntity[];
    libros: LibroEntity[];
}
 