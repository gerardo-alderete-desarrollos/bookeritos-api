import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { LibroEntity } from './entities/libros.entity';
import { LibroController } from './libros.controller';
import { LibroService } from './libros.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([LibroEntity]),
    AuthModule
  ],
  controllers: [LibroController],
  providers: [LibroService],
})
export class LibroModule {}
