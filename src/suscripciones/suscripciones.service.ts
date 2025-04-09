import { Injectable } from '@nestjs/common';
import { CreateSuscripcioneDto } from './dto/create-suscripcione.dto';
import { UpdateSuscripcioneDto } from './dto/update-suscripcione.dto';
import { SuscripcionEntity } from './entities/suscripcion.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SuscripcionesService { 
  constructor(
    @InjectRepository(SuscripcionEntity)
    private suscripcionRepository: Repository<SuscripcionEntity>){}

  async findAll(): Promise<SuscripcionEntity[]> { 
            
    return await this.suscripcionRepository.find({
       relations: { 
          users: true
      },
      order: {
        precio: 'ASC'
      }
      ,
    })
  }

  

 /*  create(createSuscripcioneDto: CreateSuscripcioneDto) {
    return 'This action adds a new suscripcione';
  }


  findOne(id: number) {
    return `This action returns a #${id} suscripcione`;
  }

  update(id: number, updateSuscripcioneDto: UpdateSuscripcioneDto) {
    return `This action updates a #${id} suscripcione`;
  }

  remove(id: number) {
    return `This action removes a #${id} suscripcione`;
  } */
}
