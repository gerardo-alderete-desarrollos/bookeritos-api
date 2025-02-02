import { Module } from '@nestjs/common';
import { IdiomasService } from './idiomas.service';
import { IdiomasController } from './idiomas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { IdiomaEntity } from './entities/idioma.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([IdiomaEntity]),
    AuthModule
  ],
  controllers: [IdiomasController],
  providers: [IdiomasService],
})
export class IdiomasModule {}
 