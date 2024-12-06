import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";
import { ExcerciseEntity } from "../../excercises/entities/excercise.entity";

export class CreateCategoriesMuscleDto {
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
    excercises: ExcerciseEntity[]
}
 