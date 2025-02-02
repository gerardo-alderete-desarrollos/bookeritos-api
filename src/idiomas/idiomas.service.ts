import { Controller, Injectable } from '@nestjs/common';
import { CreateIdiomaDto } from './dto/create-idioma.dto';
import { UpdateIdiomaDto } from './dto/update-idioma.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IdiomaEntity } from './entities/idioma.entity';

@Injectable()
export class IdiomasService {

  @InjectRepository(IdiomaEntity)
  private idiomaRepository: Repository<IdiomaEntity>

  async create(createIdiomaDto: CreateIdiomaDto) {
    return await this.idiomaRepository.save(createIdiomaDto);
  }

  async findAll(): Promise<IdiomaEntity[]> {
        
    return await this.idiomaRepository.find({
      relations: { 
        usuarios: true
      },
    })
  }

/*   create(createIdiomaDto: CreateIdiomaDto) {
    return 'This action adds a new idioma';
  }

  findOne(id: number) {
    return `This action returns a #${id} idioma`;
  }

  update(id: number, updateIdiomaDto: UpdateIdiomaDto) {
    return `This action updates a #${id} idioma`;
  }

  remove(id: number) {
    return `This action removes a #${id} idioma`;
  } */
}
