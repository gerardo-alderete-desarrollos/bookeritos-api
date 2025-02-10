import { Module } from '@nestjs/common';
import { SuscripcionesService } from './suscripciones.service';
import { SuscripcionesController } from './suscripciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SuscripcionEntity } from './entities/suscripcion.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({ 
  imports: [
    TypeOrmModule.forFeature([SuscripcionEntity]),
    AuthModule
  ],
  controllers: [SuscripcionesController],
  providers: [SuscripcionesService],
})
export class SuscripcionesModule {}
