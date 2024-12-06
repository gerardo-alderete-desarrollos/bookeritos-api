import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { CategoriesMuscleEntity } from './../../categories_muscle/entities/categories_muscle.entity';
import { CreateExcerciseDto } from './create-excercise.dto';

export class UpdateExcerciseDto extends PartialType(CreateExcerciseDto) {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Press Francess'})
    name: string;
    @IsString()
    @ApiProperty({ example: 'http://asdf/'})
    photo: string;
    @IsNotEmpty()
    @IsDateString()
    @ApiProperty({ example: '2024-11-10T06:10:10.000Z'})
    updateAt: Date;
    
    @IsNotEmpty()
    categoriesMuscle: CategoriesMuscleEntity[]
}
