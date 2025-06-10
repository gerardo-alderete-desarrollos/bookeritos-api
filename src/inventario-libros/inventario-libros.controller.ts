import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, HttpException } from '@nestjs/common';
import { InventarioLibrosService } from './inventario-libros.service';
import { CreateInventarioLibroDto } from './dto/create-inventario-libro.dto';
import { UpdateInventarioLibroDto } from './dto/update-inventario-libro.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { userActiveInterface } from 'src/common/interfaces/user-active.interface';
import { AuthDecorator } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';

@Controller('inventario-libros')
export class InventarioLibrosController {
  constructor(private readonly inventarioLibrosService: InventarioLibrosService) {}

  @Post()
  @ApiBearerAuth()
  @AuthDecorator([Rol.ADMIN, Rol.SUPERVISOR, Rol.MEMBER])
  create(@Body() createInventarioLibroDto: CreateInventarioLibroDto) {
    return this.inventarioLibrosService.create(createInventarioLibroDto);
  }

  @Get('byUser/:id') // ❗️ Corregido el endpoint (faltaba '/')
  @ApiOperation({
    summary: 'Obtiene lista de inventario asignado por usuario'
  })
  @ApiResponse({
    status: 200,
    description: 'Regresa la lista de inventario'
  })
  @ApiResponse({
    status: 400,
    description: 'ID de usuario inválido'
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontró inventario para el usuario'
  })
  async findOne(@Param('id') id: string, @Res() res: Response) {
  
    try {
      const data = await this.inventarioLibrosService.findInventarioByUser(id.toString());
  
      if (!data.length) {
        return res.status(HttpStatus.OK).json({
          data: [],
          message: `No se encontró inventario para el usuario con ID ${id}`,
          status: 200
        });
      }
  
      return res.status(HttpStatus.OK).json({
        data,
        message: 'Inventario encontrado',
        status: 200
      });
  
    } catch (error) {
      console.error(`Error obteniendo inventario para usuario ${id}:`, error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error interno del servidor',
        status: 500
      });
    }
  }

  @Get('desasignarLibros/:id')
  @ApiOperation({ summary: 'Desasigna libros al usuario' })
  @ApiResponse({ status: 200, description: 'Libros desasignados exitosamente' })
  @ApiResponse({ status: 400, description: 'ID de usuario inválido' })
  @ApiResponse({ status: 404, description: 'No se encontraron libros asignados' })
  @ApiResponse({ status: 500, description: 'Error interno del servidor' })
  async desasignarLibros(@Param('id') id: string) {

      // ✅ Llamar al servicio
      const resultado = await this.inventarioLibrosService.desasignarYAsignarLibros(id);
  
      // ✅ Validación de datos retornados
      if (!resultado) {
          throw new HttpException(`No se encontraron libros asignados para el usuario con ID ${id}.`, HttpStatus.NOT_FOUND);
      }
  
      return {
          data: resultado,
          message: `Se han desasignado los libros del usuario con ID ${id}.`,
          status: HttpStatus.OK
      };
  }
  

  @Patch(':id')
  @ApiBearerAuth()
  @AuthDecorator([Rol.ADMIN, Rol.SUPERVISOR, Rol.MEMBER])
  update(@Param('id') id: string, @Body() updateInventarioLibroDto: UpdateInventarioLibroDto) {
    return this.inventarioLibrosService.update(id, updateInventarioLibroDto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @AuthDecorator([Rol.ADMIN, Rol.SUPERVISOR, Rol.MEMBER])
  remove(@Param('id') id: string) {
    return this.inventarioLibrosService.remove(id);
  }
}
