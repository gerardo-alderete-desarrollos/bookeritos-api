import { Injectable } from '@nestjs/common';
import { CreateInventarioLibroDto } from './dto/create-inventario-libro.dto';
import { UpdateInventarioLibroDto } from './dto/update-inventario-libro.dto';
import { Repository } from 'typeorm';
import { InventarioLibroEntity } from './entities/inventario-libro.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class InventarioLibrosService { 

  constructor(@InjectRepository(InventarioLibroEntity)
                  private libroRepository: Repository<InventarioLibroEntity>){}

  async create(createInventarioLibroDto: CreateInventarioLibroDto) {
        const NEW_LIBRO = await this.libroRepository.save(createInventarioLibroDto);
        return NEW_LIBRO;
  }

  findAll() {
    return `This action returns all inventarioLibros`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inventarioLibro`;
  }

  update(id: number, updateInventarioLibroDto: UpdateInventarioLibroDto) {
    return `This action updates a #${id} inventarioLibro`;
  }

  remove(id: number) {
    return `This action removes a #${id} inventarioLibro`;
  }
}
