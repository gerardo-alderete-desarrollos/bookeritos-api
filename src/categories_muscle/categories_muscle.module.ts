import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CategoriesMuscleController } from './categories_muscle.controller';
import { CategoriesMuscleService } from './categories_muscle.service';
import { CategoriesMuscleEntity } from './entities/categories_muscle.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoriesMuscleEntity]),
    AuthModule
  ],
  controllers: [CategoriesMuscleController],
  providers: [CategoriesMuscleService],
})
export class CategoriesMuscleModule {}
