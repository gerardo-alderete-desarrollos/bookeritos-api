import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from '../common/enums/rol.enum';
import { userActiveInterface } from '../common/interfaces/user-active.interface';
import { LibroEntity } from './entities/libros.entity';
import { CreateLibroDto } from './dto/create-libros.dto';
import { UpdateLibroDto } from './dto/update-libros.dto';
import { FilesService } from 'src/files/files.service';
import { CreateInventarioLibroDto } from 'src/inventario-libros/dto/create-inventario-libro.dto';
import { InventarioLibroEntity } from 'src/inventario-libros/entities/inventario-libro.entity';
import { InventarioLibrosService } from 'src/inventario-libros/inventario-libros.service';

@Injectable()
export class LibroService {

  constructor( @InjectRepository(LibroEntity)
                private libroRepository: Repository<LibroEntity>,
                private inverntarioService:InventarioLibrosService,
                private fileService: FilesService
              ){
  } 

  async create(CreateLibroDto: CreateLibroDto, user: userActiveInterface): Promise<any> { 
    let item = new LibroEntity();
    item.name = CreateLibroDto.name;
    item.userEmail = user.email;
    item.photo = CreateLibroDto.photo;
    item.categorias = CreateLibroDto.categorias;
    item.edad_recomendada = CreateLibroDto.edad_recomendada;
    item.author = CreateLibroDto.author;
    item.sinopsis = CreateLibroDto.sinopsis;
    
    const NEW_LIBRO = await this.libroRepository.save(item);
    
    return NEW_LIBRO;
  }

  async findAll(user: userActiveInterface): Promise<LibroEntity[]> {
    return await this.libroRepository.find({
      relations: { 
        author: true,
        categorias: true,
        inventario: true,
      },
      //where: { userEmail: user.email }
    })
  }

  async findAllDisponibles(user: userActiveInterface): Promise<LibroEntity[]> {
    return await this.libroRepository.find({
      relations: { 
        author: true,
        categorias: true,
        inventario: true,
      },
      where: { 
        inventario:{
          disponible: true
        }
       }
    })
  }

  async findOne(id: number, user: userActiveInterface):Promise<LibroEntity> {

    const libro = await this.libroRepository.findOne({
      relations: {
        categorias: true,
        author: true,
        inventario: true
      },
      where: { id },
      order: { name: 'ASC'}
    })
   /*  const libro = await this.libroRepository
      .createQueryBuilder('libro')
      .where({id})
      .leftJoinAndSelect('libro.categorias', 'categorias')
      .leftJoinAndSelect('categorias.libros', 'libros')
      .getOne(); */ 

      if( !libro ) {
        throw new BadRequestException('Libro no encontrado');
      }

      //this.validateOwnership(libro, user);

    return libro;
  } 

  async update(id: number, updateLibroDto: UpdateLibroDto, user: userActiveInterface):Promise<LibroEntity> {
    let toUpdate = await this.findOne(id, user);
    
    let update = Object.assign(toUpdate, updateLibroDto)
    const libroUpdated = await this.libroRepository.save(update)
    return libroUpdated;
  }
  async addInventario(id: number, createInventario: CreateInventarioLibroDto, user: userActiveInterface):Promise<LibroEntity> {
    let toUpdate = await this.findOne(id, user);

    const inventario = await this.inverntarioService.create(createInventario);
    
    if(inventario){
      toUpdate?.inventario?.push(inventario);
      console.log('Libro agregado al inventario', toUpdate);
      const libroUpdated = await this.libroRepository.save(toUpdate)
      return libroUpdated;
    }
    return ;
  }

  async remove(id: number, user: userActiveInterface){
    const libro = await this.findOne(id,user)

    await this.fileService.deleteImage(libro.photo);

    return await this.libroRepository.softDelete(id);
  }
}
