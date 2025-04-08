import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateHijoDto } from './dto/create-hijo.dto';
import { UpdateHijoDto } from './dto/update-hijo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HijoEntity } from './entities/hijo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HijoService {

  @InjectRepository(HijoEntity)
  private hijoRepository: Repository<HijoEntity>

  async create(createHijoDto: CreateHijoDto) {
    return await this.hijoRepository.save(createHijoDto);
  }

  async update(id: string, updateHijoDto: UpdateHijoDto) {
    let toUpdate = await this.findOne(id);
    
    let update = Object.assign(toUpdate, updateHijoDto)
    const hijoUpdated = await this.hijoRepository.save(update)
    return hijoUpdated;
  }
  
  async findOne(id: string) {
    const hijo = await this.hijoRepository.findOne({
      where: { id } 
    })

    if( !hijo ) {
      throw new BadRequestException('Hijo no encontrado');
    }

    return hijo;
  }

/*   findAll() {
    return `This action returns all hijo`;
  }


  remove(id: number) {
    return `This action removes a #${id} hijo`;
  } */
}
