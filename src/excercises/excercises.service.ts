import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from '../common/enums/rol.enum';
import { userActiveInterface } from '../common/interfaces/user-active.interface';
import { CreateExcerciseDto } from './dto/create-excercise.dto';
import { UpdateExcerciseDto } from './dto/update-excercise.dto';
import { ExcerciseEntity } from './entities/excercise.entity';

@Injectable()
export class ExcercisesService {

  constructor( @InjectRepository(ExcerciseEntity)
                private excerciseRepository: Repository<ExcerciseEntity>
              ){

  } 

  async create(createExcerciseDto: CreateExcerciseDto, user: userActiveInterface): Promise<any> { 
    let item = new ExcerciseEntity();
    item.name = createExcerciseDto.name;
    item.photo = createExcerciseDto.photo;
    item.updateAt = createExcerciseDto.updateAt;
    item.categoriesMuscle = createExcerciseDto.categoriesMuscle;
    item.userEmail = user.email;
    
    const NEW_EXCERCISE = await this.excerciseRepository.save(item);
    
    return NEW_EXCERCISE;
  }

  async findAll(user: userActiveInterface): Promise<ExcerciseEntity[]> {

    if( user.rol === Rol.ADMIN) {
      return await this.excerciseRepository.find()
    }
    
    return await this.excerciseRepository.find({
      where: { userEmail: user.email }
    })
  }

  async findOne(id: number, user: userActiveInterface):Promise<ExcerciseEntity> {



    const excercise = await this.excerciseRepository
      .createQueryBuilder('excercise')
      .where({id})
      .leftJoinAndSelect('excercise.categoriesMuscle', 'categoriesMuscle')
      .leftJoinAndSelect('categoriesMuscle.excercises', 'excercises')
      .getOne();

      if( !excercise ) {
        throw new BadRequestException('Ejercicio no encontrado');
      }

      this.validateOwnership(excercise, user);

    return excercise;
  } 

  async update(id: number, updateExcerciseDto: UpdateExcerciseDto, user: userActiveInterface):Promise<ExcerciseEntity> {
    let toUpdate = await this.findOne(id, user);
    
    let update = Object.assign(toUpdate, updateExcerciseDto)
    const excerciseUpdated = await this.excerciseRepository.save(update)
    return excerciseUpdated;
  }

  async remove(id: number, user: userActiveInterface){
    await this.findOne(id,user)
    return await this.excerciseRepository.delete(id);
  }



  private validateOwnership(excercise: ExcerciseEntity, user: userActiveInterface){
    if( user.rol !== Rol.ADMIN && excercise.userEmail !== user.email ){
      throw new UnauthorizedException('No tienes permiso para acceder a este ejercicio');
    }
  }
 
}
