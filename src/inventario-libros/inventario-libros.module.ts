import { Module } from '@nestjs/common';
import { InventarioLibrosService } from './inventario-libros.service';
import { InventarioLibrosController } from './inventario-libros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { InventarioLibroEntity } from './entities/inventario-libro.entity';

@Module({
  imports:[
     TypeOrmModule.forFeature([InventarioLibroEntity]), 
        AuthModule,
  ],
  controllers: [InventarioLibrosController],
  providers: [InventarioLibrosService],
  exports: [InventarioLibrosService]
})
export class InventarioLibrosModule {}
