import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { HijoModule } from 'src/hijo/hijo.module';
import { HijoEntity } from 'src/hijo/entities/hijo.entity';
import { HijoService } from 'src/hijo/hijo.service';
import { InventarioLibrosService } from 'src/inventario-libros/inventario-libros.service';
import { InventarioLibroEntity } from 'src/inventario-libros/entities/inventario-libro.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, HijoEntity, InventarioLibroEntity]),
    forwardRef(() => AuthModule),
    HijoModule
  ],
  controllers: [UsersController],
  providers: [UsersService, HijoService, InventarioLibrosService],
  exports: [UsersService],
})
export class UsersModule {}
