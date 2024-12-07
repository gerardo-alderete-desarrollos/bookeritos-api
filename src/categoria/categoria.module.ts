import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CategoriaEntity } from './entities/categoria.entity';
import { CategoriaController } from './categoria.controller';
import { CategoriaService } from './categoria.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoriaEntity]),
    AuthModule
  ],
  controllers: [CategoriaController],
  providers: [CategoriaService],
})
export class CategoriaModule {}
