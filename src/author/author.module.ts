import { Module } from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorController } from './author.controller';
import { AuthorEntity } from './entities/author.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { LibroEntity } from 'src/libro/entities/libros.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([AuthorEntity,LibroEntity]),
    AuthModule
  ],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
