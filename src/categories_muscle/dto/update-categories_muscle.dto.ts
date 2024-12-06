import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { ExcerciseEntity } from '../../excercises/entities/excercise.entity';
import { CreateCategoriesMuscleDto } from './create-categories_muscle.dto';

export class UpdateCategoriesMuscleDto extends PartialType(CreateCategoriesMuscleDto) {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Piernas'})
    name: string;

    @IsString()
    @ApiProperty({ example: 'http://asdf/s'})
    photo: string;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({ example: '2024-11-10T06:20:10.000Z'})
    updateAt: Date;

    @IsNotEmpty()
    excercises: ExcerciseEntity[]
}
 