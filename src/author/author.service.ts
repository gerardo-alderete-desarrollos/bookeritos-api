import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorEntity } from './entities/author.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthorService {

  constructor(@InjectRepository(AuthorEntity)
  private autorRepository: Repository<AuthorEntity>){}

  async create(createAuthorDto: CreateAuthorDto): Promise<any> {
    let item = new CreateAuthorDto();
    item.name = createAuthorDto.name;
    item.libros = createAuthorDto.libros;
    item.photo = createAuthorDto.photo;
    item.edad = createAuthorDto.edad;


    const autor = await this.autorRepository.save(item);
    return autor;
  }
 
  async findAll() {
    return await this.autorRepository.find({
      relations: { 
        libros: true
      },
      order:{ name: 'asc'}
    })
  }

  async findOne(id: string) {
    const autor = await this.autorRepository.findOne({
      relations: {
        libros: true
      },
      where: { id } 
    })

    if( !autor ) {
      throw new BadRequestException('Autor no encontrado');
    }

    return autor;
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto):Promise<AuthorEntity> {
    let toUpdate = await this.findOne(id);
    
    let update = Object.assign(toUpdate, updateAuthorDto)
    const autorUpdated = await this.autorRepository.save(update)
    return autorUpdated;
  }

  async remove(id: string) {
    await this.findOne(id)
    return await this.autorRepository.softDelete(id);
  }
}
