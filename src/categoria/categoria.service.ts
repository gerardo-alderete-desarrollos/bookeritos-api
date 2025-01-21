import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from '../common/enums/rol.enum';
import { userActiveInterface } from '../common/interfaces/user-active.interface';
import { CategoriaEntity } from './entities/categoria.entity';
import { CreateCategoriaDto } from './dto/create-categoria_muscle.dto';
import { UpdateCategoriaDto } from './dto/update-categoria_muscle.dto';
 
@Injectable()
export class CategoriaService {
  constructor( @InjectRepository(CategoriaEntity)
                private categoriaRepository: Repository<CategoriaEntity>
              ){

  } 

  async create(CreateCategoriaDto: CreateCategoriaDto, user: userActiveInterface):Promise<CategoriaEntity> {
    let item = new CategoriaEntity();
    item.name = CreateCategoriaDto.name;
    item.photo = CreateCategoriaDto.photo;
    item.updateAt = CreateCategoriaDto.updateAt;
    item.libros = CreateCategoriaDto.libros;
    item.userEmail = user.email
    
    const NEW_CATEGORIA = await this.categoriaRepository.save(item);
    
    return NEW_CATEGORIA; 
  } 

  async findAll(user: userActiveInterface):Promise<CategoriaEntity[]> {
    

    if( user.rol === Rol.ADMIN) {
      return await this.categoriaRepository.find({
        relations: {
          libros: true
        },
      })
    }
    
    return await this.categoriaRepository.find({
      relations: {
        libros: true
      },
      where: { userEmail: user.email }
    })
  }

  async findOne(id: number, user: userActiveInterface):Promise<CategoriaEntity> {
    const categorieMuscle = await this.categoriaRepository
    .createQueryBuilder('categorias')
    .where({id})
    .leftJoinAndSelect('categorias.libros', 'libros')
    .getOne();

    if( !categorieMuscle ){
      throw new BadRequestException('Categoria no encontrada');
    }

    this.validateOwnership(categorieMuscle, user);

    return categorieMuscle;
    
  }

  async update(id: number, UpdateCategoriaDto: UpdateCategoriaDto,user: userActiveInterface):Promise<CategoriaEntity> {
    let toUpdate = await this.findOne(id, user);
    
    let update = Object.assign(toUpdate, UpdateCategoriaDto)
    
    const category_muscleUpdated = await this.categoriaRepository.save(update)
    return category_muscleUpdated;
  }

  async remove(id: number, user: userActiveInterface):Promise<void>{
    const categoriaTemp = await this.findOne(id,user);
    
    if( categoriaTemp ) {
      categoriaTemp.libros = [];
      const categoriaUpdated = await this.categoriaRepository.save(categoriaTemp);

      if( categoriaUpdated ) {
        await this.categoriaRepository.softDelete(id);
      }
    }
  }

  private validateOwnership(excercise: CategoriaEntity, user: userActiveInterface){
    if( user.rol !== Rol.ADMIN && excercise.userEmail !== user.email ){
      throw new UnauthorizedException('No tienes permiso para acceder a esta Categoria');
    }
  }
}
