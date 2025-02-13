import { Injectable } from '@nestjs/common';
import { CreateInventarioLibroDto } from './dto/create-inventario-libro.dto';
import { UpdateInventarioLibroDto } from './dto/update-inventario-libro.dto';

@Injectable()
export class InventarioLibrosService {
  create(createInventarioLibroDto: CreateInventarioLibroDto) {
    return 'This action adds a new inventarioLibro';
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
