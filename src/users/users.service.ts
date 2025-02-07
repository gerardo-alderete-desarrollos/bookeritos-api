import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userActiveInterface } from '../common/interfaces/user-active.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcryptjs from 'bcryptjs';
import { HijoService } from 'src/hijo/hijo.service';
import { CreateHijoDto } from 'src/hijo/dto/create-hijo.dto';
import { UpdateHijoDto } from 'src/hijo/dto/update-hijo.dto';

@Injectable()
export class UsersService {

  @InjectRepository(UserEntity)
  private userRepository: Repository<UserEntity>

  constructor(private hijoService: HijoService){}

  async create(createUserDto: CreateUserDto, user: userActiveInterface) {
    const u = await this.findOneByEmail(createUserDto.email);
 
    if( u ){
        throw new BadRequestException('User already exists')
    }
    
    createUserDto.password =  await bcryptjs.hash(createUserDto.password,10);
    
    return await this.userRepository.save(createUserDto);
  }


  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({email})
  }

  async findByEmailWithPassword(email: string) {
    
    return await this.userRepository.findOne({
      where : {email},
      select: ['id', 'name', 'email', 'password', 'rol']
    })
  }


  async findAll(user: userActiveInterface) {
    return this.userRepository.find({
      relations: {
        hijos: true,
        generosInteres: true,
        idiomasInteres: true,
      }
    })
  }

  async findOne(id: number, user: userActiveInterface) {
    return await this.userRepository.findOne({
      where: { id },
      relations: {
        hijos: true,
        generosInteres: true,
        idiomasInteres: true,
      }
    })
  }


  async update(id: number, updateUserDto: UpdateUserDto, user: userActiveInterface) {
    let toUpdate = await this.findOne(id, user);

    if( !toUpdate ){
      throw new NotFoundException({ 
        message: 'No existe usuario con ese ID',
        status: 400
      })
    }

    
    if( updateUserDto.hijos || updateUserDto.hijos.length > 0 ){

      updateUserDto.hijos.forEach( async(h) => {
     

        if( !h.id ){
          const hijo:CreateHijoDto = {
            edad: h.edad,
            name: h.name,
            user: toUpdate
          }

          await this.hijoService.create(hijo);
        } else{

          await this.hijoService.update(h.id, h)
        }
      })

    }

    //valida si el usuario completo su perfil
    const updated = this.validateProfileComplete(updateUserDto); 

    let update = Object.assign(toUpdate, updated)
    const userUpdated = await this.userRepository.save(update)
    return userUpdated;
  }

  async remove(id: number, user: userActiveInterface) {
    const u = await this.findOne(id, user);

    if( !u ){
      throw new NotFoundException({ 
        message: 'No existe usuario con ese ID',
        status: 400
      })
    }
    return this.userRepository.softDelete(id);
  }

  validateProfileComplete(updateUserDto: UpdateUserDto){
      if((updateUserDto.name && updateUserDto.name != '') &&
        (updateUserDto.email && updateUserDto.email != '')&&
        (updateUserDto.rol && updateUserDto.rol != '')&&
        (updateUserDto.hijos && updateUserDto.hijos.length > 0)&&
        (updateUserDto.direccion && updateUserDto.direccion != '')&&
        (updateUserDto.referencias && updateUserDto.referencias != '')&&
        (updateUserDto.telefono && updateUserDto.telefono != '')&&
        (updateUserDto.ine && updateUserDto.ine != '')&&
        (updateUserDto.comprobanteDomicilio && updateUserDto.comprobanteDomicilio != '')&&
        (updateUserDto.cantidadHijos )&&
        (updateUserDto.nivelLectorHijos && updateUserDto.nivelLectorHijos != '')&&
        (updateUserDto.edad )&&
        (updateUserDto.preguntasComentarios && updateUserDto.preguntasComentarios!= '')
        
    ){
      updateUserDto.isProfileComplete = true;
    } else{
      updateUserDto.isProfileComplete = false;

    }
    console.log(updateUserDto);
    
    return updateUserDto;
  }
}
