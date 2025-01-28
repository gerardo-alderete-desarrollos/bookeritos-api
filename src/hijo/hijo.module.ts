import { Module } from '@nestjs/common';
import { HijoService } from './hijo.service';
import { HijoController } from './hijo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HijoEntity } from './entities/hijo.entity';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  imports: [    
    TypeOrmModule.forFeature([HijoEntity, UserEntity])
  ],
  controllers: [HijoController],
  providers: [HijoService],
})
export class HijoModule {}
