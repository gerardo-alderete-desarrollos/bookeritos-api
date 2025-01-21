import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthDecorator } from '../auth/decorators/auth.decorator';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { Rol } from '../common/enums/rol.enum';
import { userActiveInterface } from '../common/interfaces/user-active.interface';
import { LibroService } from './libros.service';
import { CreateLibroDto } from './dto/create-libros.dto';
import { UpdateLibroDto } from './dto/update-libros.dto';


@ApiTags('Libros')
@ApiBearerAuth()
@AuthDecorator([Rol.ADMIN, Rol.SUPERVISOR, Rol.MEMBER])
@Controller('libros')
export class LibroController {
  constructor(private readonly libroService: LibroService) {}

  @Post()
  @ApiOperation({
    summary: 'Crea un Libro'
  })
  @ApiResponse({
    status: 201,
    description: 'Regresa el Libro creado'
  })
  async create(
    @Body() CreateLibroDto: CreateLibroDto, 
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface) { 
      const data = await this.libroService.create(CreateLibroDto, user);

      res.status(HttpStatus.CREATED).json({ 
        data: data,
        message: 'Libro creado correctamente',
        status: 201
      })
  }

  @Get()
  @ApiOperation({
    summary: 'Obtiene todos los Libros'
  })
  @ApiResponse({
    status: 200,
    description: 'Regresa todos los Libros'
  })
  async findAll(
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface
  ) {

    const data = await this.libroService.findAll(user);

    res.status(HttpStatus.OK).json({
      data,
      message: 'Libros encontrados',
      status: 200
    })
  }
 
  @Get(':id')
  @ApiOperation({
    summary: 'Obtiene un Libro'
  })
  @ApiResponse({
    status: 200,
    description: 'Regresa un Libro'
  })
  async findOne(
    @Param('id') id: string, 
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface) {
    const data = await this.libroService.findOne(+id, user);

    res.status(HttpStatus.OK).json({
      data,
      message: 'Libro encontrado',
      status: 200
    })
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualiza un Libros'
  })
  @ApiResponse({
    status: 200,
    description: 'Regresa el Libro actualizado'
  })
  async update(
    @Param('id') id: string, 
    @Body() updateLibroDto: UpdateLibroDto,
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface) {

    const data = await this.libroService.update(+id, updateLibroDto, user);
    res.status(HttpStatus.OK).json({
      data,
      message: 'Libro actualizado',
      status: 200
    })
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Elimina un Libro'
  })
  @ApiResponse({
    status: 200,
    description: 'Elimina un Libro'
  })
  async remove(
    @Param('id') id: string,
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface) {
    
      const data = await this.libroService.remove(+id, user);

      res.status(HttpStatus.OK).json({
        data,
        message: 'Libro eliminado',
        status: 200
      });
  }
}
