import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { LibroEntity } from './entities/libros.entity';
import { LibroController } from './libros.controller';
import { LibroService } from './libros.service';
import { AuthorEntity } from 'src/author/entities/author.entity';
import { EditorialEntity } from 'src/editorial/entities/editorial.entity';
import { AuthorModule } from 'src/author/author.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LibroEntity]), 
    AuthModule,
    FilesModule,
  ],
  controllers: [LibroController],
  providers: [LibroService],
})
export class LibroModule {}
