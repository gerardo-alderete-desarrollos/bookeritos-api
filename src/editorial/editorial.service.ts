import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateEditorialDto } from './dto/create-editorial.dto';
import { UpdateEditorialDto } from './dto/update-editorial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EditorialEntity } from './entities/editorial.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EditorialService {
 
  constructor(@InjectRepository(EditorialEntity)
  private editorialRepository: Repository<EditorialEntity>){}


  async create(createEditorialDto: CreateEditorialDto): Promise<any> {
    let item = new CreateEditorialDto();
    item.name = createEditorialDto.name;
    item.libros = createEditorialDto.libros;
    item.photo = createEditorialDto.photo;

    const libro = await this.editorialRepository.save(item)
 
    
    return libro;
  }

  async findAll() {
    return await this.editorialRepository.find({
      relations: { 
        libros: true
      },
      order: { name: 'asc' }
    })
  }

  async findOne(id: string) {
    const editorial = await this.editorialRepository.findOne({
      relations: {
        libros: true
      },
      where: { id } 
    })

    if( !editorial ) {
      throw new BadRequestException('Editorial no encontrada');
    }

    return editorial;
  }

  async update(id: string, updateEditorialDto: UpdateEditorialDto):Promise<EditorialEntity> {
    let toUpdate = await this.findOne(id);
    
    let update = Object.assign(toUpdate, updateEditorialDto)
    const libroUpdated = await this.editorialRepository.save(update)
    return libroUpdated;
  }

  async remove(id: string) {
    await this.findOne(id)
    return await this.editorialRepository.softDelete(id);
  }


}
