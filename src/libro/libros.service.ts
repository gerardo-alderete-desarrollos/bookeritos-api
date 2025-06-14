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
    item.photo = CreateLibroDto.photo;
    item.categorias = CreateLibroDto.categorias;
    item.edad_recomendada = CreateLibroDto.edad_recomendada;
    item.author = CreateLibroDto.author;
    item.inventario = [];
    item.sinopsis = CreateLibroDto.sinopsis;
    
    console.log('CREATE LIBRO-------');
    console.log(CreateLibroDto)

    try {
      const NEW_LIBRO = await this.libroRepository.save(item);
      return NEW_LIBRO
    } catch (error) {
      console.log('ERROR----', error);
      
      throw new BadRequestException(error);
    }
    
  }

  async findAll(user: userActiveInterface): Promise<LibroEntity[]> {
    try {
      return this.libroRepository.find({
        relations: {
          author: true,
          categorias: true,
          inventario: true,
        },
        //where: { userEmail: user.email }, // Ajusta según la estructura de tu entidad
        order: { name: 'desc' }, // Ordenar por título ascendente
      });
    } catch (error) {
      throw new Error(`Error al obtener libros: ${error.message}`);
    }
  }

  async findAllDisponibles(user: userActiveInterface): Promise<LibroEntity[]> {
    return await this.libroRepository.find({
      relations: { 
        author: true,
        categorias: true,
        inventario: {
          idioma: true,
          editorial: true,
        },
      
      },
      order: { name: 'asc'  }, // Ordenar por título ascendente
     /*  where: { 
        inventario:{
          disponible: true
        }
       } */
    })
  }

  async findOne(id: string, user: userActiveInterface):Promise<LibroEntity> {

    const libro = await this.libroRepository.findOne({
      relations: {
        categorias: true,
        author: true,
        inventario: {
          idioma: true
        }
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

  async update(id: string, updateLibroDto: UpdateLibroDto, user: userActiveInterface):Promise<LibroEntity> {
    let toUpdate = await this.findOne(id, user);
    
    let update = Object.assign(toUpdate, updateLibroDto)
    const libroUpdated = await this.libroRepository.save(update)
    return libroUpdated;
  }
  async addInventario(id: string, createInventario: CreateInventarioLibroDto, user: userActiveInterface):Promise<LibroEntity | any> {
    
    try{
      let toUpdate = await await this.libroRepository.findOne({
        relations: {
          inventario: true
        },
        where: { id },
      })
      console.log('LIBRO ENCONTRADO----', toUpdate);
      console.log('Inventario create', createInventario)
      
      //createInventario.libro
      const inventario = await this.inverntarioService.create(createInventario);
      
      if(inventario){
        toUpdate?.inventario?.push(inventario);
        const libroUpdated = await this.libroRepository.save(toUpdate)
        return libroUpdated;
      }
    } catch(error){
      console.log('ERROR AL AGREGAR LIBRO', error);
      throw new BadRequestException('Error al agregar al inventario del libro', error);
    }
    
  }

  async remove(id: string, user: userActiveInterface){
    const libro = await this.findOne(id,user)

    await this.fileService.deleteImage(libro.photo);

    return await this.libroRepository.softDelete(id);
  }
}
