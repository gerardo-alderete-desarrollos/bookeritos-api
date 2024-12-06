import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from '../common/enums/rol.enum';
import { userActiveInterface } from '../common/interfaces/user-active.interface';
import { CreateCategoriesMuscleDto } from './dto/create-categories_muscle.dto';
import { UpdateCategoriesMuscleDto } from './dto/update-categories_muscle.dto';
import { CategoriesMuscleEntity } from './entities/categories_muscle.entity';
 
@Injectable()
export class CategoriesMuscleService {
  constructor( @InjectRepository(CategoriesMuscleEntity)
                private categories_muscleRepository: Repository<CategoriesMuscleEntity>
              ){

  } 

  async create(createCategoriesMuscleDto: CreateCategoriesMuscleDto, user: userActiveInterface):Promise<CategoriesMuscleEntity> {
    let item = new CategoriesMuscleEntity();
    item.name = createCategoriesMuscleDto.name;
    item.photo = createCategoriesMuscleDto.photo;
    item.updateAt = createCategoriesMuscleDto.updateAt;
    item.excercises = createCategoriesMuscleDto.excercises;
    item.userEmail = user.email
    
    const NEW_CATEGORIE_MUSCLE = await this.categories_muscleRepository.save(item);
    
    return NEW_CATEGORIE_MUSCLE; 
  } 

  async findAll(user: userActiveInterface):Promise<CategoriesMuscleEntity[]> {
    

    if( user.rol === Rol.ADMIN) {
      return await this.categories_muscleRepository.find();
    }
    
    return await this.categories_muscleRepository.find({
      where: { userEmail: user.email }
    })
  }

  async findOne(id: number, user: userActiveInterface):Promise<CategoriesMuscleEntity> {
    const categorieMuscle = await this.categories_muscleRepository
    .createQueryBuilder('categoriesMuscle')
    .where({id})
    .leftJoinAndSelect('categoriesMuscle.excercises', 'excercises')
    //.leftJoinAndSelect('excercices.categoriesMuscle', 'categoriesMuscle')
    .getOne();

    if( !categorieMuscle ){
      throw new BadRequestException('Categoria de musculo no encontrada');
    }

    this.validateOwnership(categorieMuscle, user);

    return categorieMuscle;
    
  }

  async update(id: number, updateCategoriesMuscleDto: UpdateCategoriesMuscleDto,user: userActiveInterface):Promise<CategoriesMuscleEntity> {
    let toUpdate = await this.findOne(id, user);
    
    let update = Object.assign(toUpdate, updateCategoriesMuscleDto)
    
    const category_muscleUpdated = await this.categories_muscleRepository.save(update)
    return category_muscleUpdated;
  }

  async remove(id: number, user: userActiveInterface):Promise<void>{
    const categorieMuscleTemp = await this.findOne(id,user);
    
    if( categorieMuscleTemp ) {
      categorieMuscleTemp.excercises = [];
      const categorieMuscleUpdated = await this.categories_muscleRepository.save(categorieMuscleTemp);

      if( categorieMuscleUpdated ) {
        await this.categories_muscleRepository.delete(id);
      }
    }
  }

  private validateOwnership(excercise: CategoriesMuscleEntity, user: userActiveInterface){
    if( user.rol !== Rol.ADMIN && excercise.userEmail !== user.email ){
      throw new UnauthorizedException('No tienes permiso para acceder a esta Categoria de musculo');
    }
  }
}
