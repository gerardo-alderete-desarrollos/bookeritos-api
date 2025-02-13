import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventarioLibrosService } from './inventario-libros.service';
import { CreateInventarioLibroDto } from './dto/create-inventario-libro.dto';
import { UpdateInventarioLibroDto } from './dto/update-inventario-libro.dto';

@Controller('inventario-libros')
export class InventarioLibrosController {
  constructor(private readonly inventarioLibrosService: InventarioLibrosService) {}

  @Post()
  create(@Body() createInventarioLibroDto: CreateInventarioLibroDto) {
    return this.inventarioLibrosService.create(createInventarioLibroDto);
  }

  @Get()
  findAll() {
    return this.inventarioLibrosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventarioLibrosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventarioLibroDto: UpdateInventarioLibroDto) {
    return this.inventarioLibrosService.update(+id, updateInventarioLibroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventarioLibrosService.remove(+id);
  }
}
