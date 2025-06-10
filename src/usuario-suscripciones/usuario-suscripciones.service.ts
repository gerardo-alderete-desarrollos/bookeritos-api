import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    try {
      console.log('Creando usuario suscripción:', createUsuarioSuscripcioneDto);

      // Guardar en la base de datos
      const usuarioSuscripcion = await this.usuarioSuscripcionRepository.save(createUsuarioSuscripcioneDto);
      
      console.log('Usuario suscripción creada con éxito:', usuarioSuscripcion);
      return usuarioSuscripcion;

    } catch (error) {
      console.error('Error al crear usuario suscripción:', error);
      
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new Error('No se pudo crear la suscripción del usuario. Intente nuevamente.');
    }
  }

async findOne(id: string) {
   // Buscar las suscripciones con relaciones
   const usuariosSuscripcion = await this.usuarioSuscripcionRepository.find({
    relations: {
      user: true,
      suscription: true,
    },
  });

  // Filtrar por usuario
  const suscripcionByUser = usuariosSuscripcion.filter(us => us.user.id === id);

  return suscripcionByUser;
}

async changeStatusSuscription(id: string , estatus: Estatus){
  const toUpdate: any = await this.usuarioSuscripcionRepository.findBy({id});
 
  if( !toUpdate ){
    throw new BadRequestException('No existe una suscripcion con el id ' + id);
  }

  toUpdate[0].estatus = estatus;
  return await this.usuarioSuscripcionRepository.save(toUpdate[0]);

}
async updateUsuarioSuscripcion(updateDto: UpdateUsuarioSuscripcioneDto) {
  try {
    console.log('Actualizando usuario suscripción:', updateDto);

    // Validar que el DTO tenga un ID
    const { id } = updateDto;
    if (!id) {
      throw new BadRequestException('El ID de la suscripción es obligatorio.');
    }

    // Preload carga el objeto existente y aplica los cambios
    const updatedSubscription = await this.usuarioSuscripcionRepository.preload(updateDto);

    if (!updatedSubscription) {
      throw new NotFoundException(`No existe una suscripción con el ID ${id}`);
    }

    // Guardar los cambios en la base de datos
    await this.usuarioSuscripcionRepository.save(updatedSubscription);

    console.log('Usuario suscripción actualizada con éxito:', updatedSubscription);
    return updatedSubscription;

  } catch (error) {
    console.error('Error al actualizar usuario suscripción:', error);

    if (error instanceof BadRequestException || error instanceof NotFoundException) {
      throw error;
    }

    throw new Error('No se pudo actualizar la suscripción del usuario. Intente nuevamente.');
  }
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
