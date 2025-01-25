import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from '../common/enums/rol.enum';
import { userActiveInterface } from '../common/interfaces/user-active.interface';
import { LibroEntity } from './entities/libros.entity';
import { CreateLibroDto } from './dto/create-libros.dto';
import { UpdateLibroDto } from './dto/update-libros.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class LibroService {

  constructor( @InjectRepository(LibroEntity)
                private libroRepository: Repository<LibroEntity>,
                private fileService: FilesService
              ){
  } 

  async create(CreateLibroDto: CreateLibroDto, user: userActiveInterface): Promise<any> { 
    let item = new LibroEntity();
    item.name = CreateLibroDto.name;
    item.userEmail = user.email;
    item.photo = CreateLibroDto.photo;
    item.updateAt = CreateLibroDto.updateAt;
    item.categorias = CreateLibroDto.categorias;
    item.edad_recomendada = CreateLibroDto.edad_recomendada;
    item.paginas = CreateLibroDto.paginas;
    item.estatus_renta = CreateLibroDto.estatus_renta;
    item.year_publicacion = CreateLibroDto.year_publicacion;
    item.idioma = CreateLibroDto.idioma;
    item.llego_compra = CreateLibroDto.llego_compra;
    item.fecha_compra = CreateLibroDto.fecha_compra;
    item.precio_original = CreateLibroDto.precio_original;
    item.precio_final = CreateLibroDto.precio_final;
    item.edicion = CreateLibroDto.edicion;
    item.proveedor = CreateLibroDto.proveedor;
    item.editorial = CreateLibroDto.editorial;
    item.author = CreateLibroDto.author;
    item.sinopsis = CreateLibroDto.sinopsis;
    
    const NEW_LIBRO = await this.libroRepository.save(item);
    
    return NEW_LIBRO;
  }

  async findAll(user: userActiveInterface): Promise<LibroEntity[]> {

    if( user.rol === Rol.ADMIN) {
      return await this.libroRepository.find({
        relations: { 
          author: true,
          editorial: true,
          categorias: true
        },
      })
    }
    
    return await this.libroRepository.find({
      relations: { 
        author: true,
        editorial: true,
        categorias: true
      },
      where: { userEmail: user.email }
    })
  }

  async findOne(id: number, user: userActiveInterface):Promise<LibroEntity> {



    const libro = await this.libroRepository.findOne({
      relations: {
        categorias: true,
        author: true,
        editorial: true,
      },
      where: { id } 
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

      this.validateOwnership(libro, user);

    return libro;
  } 

  async update(id: number, updateLibroDto: UpdateLibroDto, user: userActiveInterface):Promise<LibroEntity> {
    let toUpdate = await this.findOne(id, user);
    
    let update = Object.assign(toUpdate, updateLibroDto)
    const libroUpdated = await this.libroRepository.save(update)
    return libroUpdated;
  }

  async remove(id: number, user: userActiveInterface){
    const libro = await this.findOne(id,user)

    await this.fileService.deleteImage(libro.photo);

    return await this.libroRepository.softDelete(id);
  }



  private validateOwnership(libro: LibroEntity, user: userActiveInterface){
    if( user.rol !== Rol.ADMIN && libro.userEmail !== user.email ){
      throw new UnauthorizedException('No tienes permiso para acceder a este Libro');
    }
  }
 
}
