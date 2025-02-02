import { IsNumber, IsString } from "class-validator";
import { UserEntity } from "src/users/entities/user.entity";

export class CreateIdiomaDto {
    @IsString()
    name: string;
    @IsNumber()
    edad: number;

    usuarios: UserEntity[];

}
 