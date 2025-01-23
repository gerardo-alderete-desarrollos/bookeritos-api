import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { userActiveInterface } from '../common/interfaces/user-active.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {

  @InjectRepository(UserEntity)
  private userRepository: Repository<UserEntity>

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
    console.log(email);
    
    return await this.userRepository.findOne({
      where : {email},
      select: ['id', 'name', 'email', 'password', 'rol']
    })
  }


  async findAll(user: userActiveInterface) {
    return this.userRepository.find({
      //where: {email: user.email},
      select: ['id', 'name', 'email', 'rol']
    })
  }

  async findOne(id: number, user: userActiveInterface) {
    return await this.userRepository.findOne({
      where: { id },
      select: ['id', 'name', 'email', 'rol', ]
    })
  }


  async update(id: number, updateUserDto: UpdateUserDto, user: userActiveInterface) {
    let toUpdate = await this.findOne(id, user);
    console.log('user', user);
    console.log('updateUserDto', updateUserDto);
    console.log('updateUserDto', toUpdate);

    if( !toUpdate ){
      throw new NotFoundException({ 
        message: 'No existe usuario con ese ID',
        status: 400
      })
    }

    let update = Object.assign(toUpdate, updateUserDto)
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
}
