import { Injectable } from '@nestjs/common';
import { UpdateUsuarioSuscripcioneDto } from './dto/update-usuario-suscripcione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioSuscripcionEntity } from './entities/usuario-suscripcione.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioSuscripcionesDto } from './dto/create-usuario-suscripcione.dto';

@Injectable()
export class UsuarioSuscripcionesService {
   constructor(
          @InjectRepository(UsuarioSuscripcionEntity)
          private usuarioSuscripcionRepository: Repository<UsuarioSuscripcionEntity>){}

  async findSuscriptionsByUser(userId: number): Promise<UsuarioSuscripcionEntity[]> {
    return await this.usuarioSuscripcionRepository.find({
      where: { userId }, 
    })
  }

async createUsuarioSuscripcion(createUsuarioSuscripcioneDto: CreateUsuarioSuscripcionesDto) { 
    console.log('createSuscripcioneDto');
    console.log(createUsuarioSuscripcioneDto);
    const usuarioSuscripcion = await this.usuarioSuscripcionRepository.save(createUsuarioSuscripcioneDto)
    return usuarioSuscripcion;
}
 /*  create(createUsuarioSuscripcioneDto: CreateUsuarioSuscripcioneDto) {
    return 'This action adds a new usuarioSuscripcione';
  }

  findAll() {
    return `This action returns all usuarioSuscripciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioSuscripcione`;
  }

  update(id: number, updateUsuarioSuscripcioneDto: UpdateUsuarioSuscripcioneDto) {
    return `This action updates a #${id} usuarioSuscripcione`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioSuscripcione`;
  } */
}
