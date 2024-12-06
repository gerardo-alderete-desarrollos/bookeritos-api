import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ExcerciseEntity } from './entities/excercise.entity';
import { ExcercisesController } from './excercises.controller';
import { ExcercisesService } from './excercises.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExcerciseEntity]),
    AuthModule
  ],
  controllers: [ExcercisesController],
  providers: [ExcercisesService],
})
export class ExcercisesModule {}
