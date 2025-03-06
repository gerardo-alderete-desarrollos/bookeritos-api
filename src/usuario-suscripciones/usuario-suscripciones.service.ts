import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUsuarioSuscripcioneDto } from './dto/update-usuario-suscripcione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioSuscripcionEntity } from './entities/usuario-suscripcione.entity';
import { Repository } from 'typeorm';
import { CreateUsuarioSuscripcionesDto } from './dto/create-usuario-suscripcione.dto';
import { Estatus } from 'src/common/enums/estatus.enum';
import { UsersService } from 'src/users/users.service';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class UsuarioSuscripcionesService {
   constructor(
          @InjectRepository(UsuarioSuscripcionEntity)
          private usuarioSuscripcionRepository: Repository<UsuarioSuscripcionEntity>,
      ){}

  async findSuscriptionsByUser(userId: number): Promise<UsuarioSuscripcionEntity[]> {
    return await this.usuarioSuscripcionRepository.find({
      //where: { userId }, 
    })
  }
  async findHistorialSuscription(): Promise<UsuarioSuscripcionEntity[]> {
    return await this.usuarioSuscripcionRepository.find({
      relations:{
        user: true,
        suscription: true
      }
    })
  }

async createUsuarioSuscripcion(createUsuarioSuscripcioneDto: CreateUsuarioSuscripcionesDto) { 
    const usuarioSuscripcion = await this.usuarioSuscripcionRepository.save(createUsuarioSuscripcioneDto)
    return usuarioSuscripcion;
}

async findOne(id: number) {
  const usuariosSuscripcion: UsuarioSuscripcionEntity[] = await this.usuarioSuscripcionRepository.find({
    relations:{
      user: true,
      suscription: true,
    }});
    const suscripcionByUser = usuariosSuscripcion.filter( us=> us.user.id = id);
  return suscripcionByUser;
}

async changeStatusSuscription(id: number , estatus: Estatus){
  const toUpdate: any = await this.usuarioSuscripcionRepository.findBy({id});
 
  if( !toUpdate ){
    throw new BadRequestException('No existe una suscripcion con el id ' + id);
  }

  toUpdate[0].estatus = estatus;
  return await this.usuarioSuscripcionRepository.save(toUpdate[0]);

}
 /*  create(createUsuarioSuscripcioneDto: CreateUsuarioSuscripcioneDto) {
    return 'This action adds a new usuarioSuscripcione';
  }

  findAll() {
    return `This action returns all usuarioSuscripciones`;
  }

  

  update(id: number, updateUsuarioSuscripcioneDto: UpdateUsuarioSuscripcioneDto) {
    return `This action updates a #${id} usuarioSuscripcione`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioSuscripcione`;
  } */
}
