import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthDecorator } from '../auth/decorators/auth.decorator';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { Rol } from '../common/enums/rol.enum';
import { userActiveInterface } from '../common/interfaces/user-active.interface';
import { CategoriaService } from './categoria.service';
import { CreateCategoriaDto } from './dto/create-categoria_muscle.dto';
import { UpdateCategoriaDto } from './dto/update-categoria_muscle.dto';

@ApiTags('Categorias')
@ApiBearerAuth()
@AuthDecorator([Rol.ADMIN, Rol.SUPERVISOR, Rol.MEMBER])
@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}
 
  @Post()
  @ApiOperation({
    summary: 'Crea una Categoria'
  })
  @ApiResponse({
    status: 201,
    description: 'Regresa la Categoria creada'
  })
  async create(
    @Body() CreateCategoriaDto: CreateCategoriaDto, 
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface) {
    const data = await this.categoriaService.create(CreateCategoriaDto, user);

    res.status(HttpStatus.CREATED).json({
      data,
      message: 'Categoria de musculo creada',
      status: 201
    })
  }


  @Get()
  @ApiOperation({
    summary: 'Obtiene todas las Categorias'
  })
  @ApiResponse({
    status: 200,
    description: 'Regresa todas la Categorias'
  })
  async findAll( 
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface) {
    const data = await this.categoriaService.findAll(user);

    res.status(HttpStatus.OK).json({
      data,
      message: 'Categoria  encontradas',
      status: 200
    })
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtiene una Categoria'
  })
  @ApiResponse({
    status: 200,
    description: 'Regresa una Categoria'
  })
  async findOne(
    @Param('id') id: string, 
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface) {
    const data = await this.categoriaService.findOne(+id, user);

    res.status(HttpStatus.OK).json({
      data,
      message: 'Categoria encontrada',
      status: 200
    })

  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualiza una Categoria'
  })
  @ApiResponse({
    status: 200,
    description: 'Regresa la Categoria actualizada'
  })
  async update(
    @Param('id') id: string,
    @Body() UpdateCategoriaDto: UpdateCategoriaDto,
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface) {
    const data = await this.categoriaService.update(+id, UpdateCategoriaDto, user);
    
    res.status(HttpStatus.OK).json({
      data,
      message: 'Categoria de musculo actualizada',
      status: 200
    })
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Elimina una Categoria'
  })
  @ApiResponse({
    status: 200,
    description: 'Elimina una Categoria'
  })
  async remove(
    @Param('id') id: string,
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface) {
    const data = await this.categoriaService.remove(+id, user);

    res.status(HttpStatus.OK).json({
      data,
      message: 'Categoria de musculo eliminada',
      status: 200
    })
  }
}
