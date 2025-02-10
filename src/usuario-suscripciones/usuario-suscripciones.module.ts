import { Module } from '@nestjs/common';
import { UsuarioSuscripcionesService } from './usuario-suscripciones.service';
import { UsuarioSuscripcionesController } from './usuario-suscripciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioSuscripcionEntity } from './entities/usuario-suscripcione.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
       TypeOrmModule.forFeature([UsuarioSuscripcionEntity]),
        AuthModule
  ],
  controllers: [UsuarioSuscripcionesController],
  providers: [UsuarioSuscripcionesService],
})
export class UsuarioSuscripcionesModule {}
