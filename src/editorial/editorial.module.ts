import { Module } from '@nestjs/common';
import { EditorialService } from './editorial.service';
import { EditorialController } from './editorial.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EditorialEntity } from './entities/editorial.entity';
import { AuthModule } from 'src/auth/auth.module';
import { LibroEntity } from 'src/libro/entities/libros.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([EditorialEntity]),
    AuthModule
  ],
  controllers: [EditorialController],
  providers: [EditorialService],
})
export class EditorialModule {}
