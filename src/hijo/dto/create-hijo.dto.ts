import { UserEntity } from "src/users/entities/user.entity";
import { IsNumber, IsString } from "class-validator";

export class CreateHijoDto {
    @IsString()
    name: string;
    @IsNumber()
    edad: number;

    user?: UserEntity;
}
