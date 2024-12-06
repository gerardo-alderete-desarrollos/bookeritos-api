import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";
import { CategoriesMuscleEntity } from "../../categories_muscle/entities/categories_muscle.entity";

export class CreateExcerciseDto {
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
    categoriesMuscle: CategoriesMuscleEntity[];

}
