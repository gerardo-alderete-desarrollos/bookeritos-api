import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthDecorator } from '../auth/decorators/auth.decorator';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { Rol } from '../common/enums/rol.enum';
import { userActiveInterface } from '../common/interfaces/user-active.interface';
import { CategoriesMuscleService } from './categories_muscle.service';
import { CreateCategoriesMuscleDto } from './dto/create-categories_muscle.dto';
import { UpdateCategoriesMuscleDto } from './dto/update-categories_muscle.dto';

@ApiTags('Categories Muscle')
@ApiBearerAuth()
@AuthDecorator([Rol.ADMIN, Rol.TRAINER, Rol.MEMBER])
@Controller('categories-muscle')
export class CategoriesMuscleController {
  constructor(private readonly categoriesMuscleService: CategoriesMuscleService) {}
 
  @Post()
  @ApiOperation({
    summary: 'Crea una Categoria'
  })
  @ApiResponse({
    status: 201,
    description: 'Regresa la Categoria creada'
  })
  async create(
    @Body() createCategoriesMuscleDto: CreateCategoriesMuscleDto, 
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface) {
    const data = await this.categoriesMuscleService.create(createCategoriesMuscleDto, user);

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
    const data = await this.categoriesMuscleService.findAll(user);

    res.status(HttpStatus.OK).json({
      data,
      message: 'Categoria de musculo encontradas',
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
    const data = await this.categoriesMuscleService.findOne(+id, user);

    res.status(HttpStatus.OK).json({
      data,
      message: 'Categoria de musculo encontrada',
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
    @Body() updateCategoriesMuscleDto: UpdateCategoriesMuscleDto,
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface) {
    const data = await this.categoriesMuscleService.update(+id, updateCategoriesMuscleDto, user);
    
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
    const data = await this.categoriesMuscleService.remove(+id, user);

    res.status(HttpStatus.OK).json({
      data,
      message: 'Categoria de musculo eliminada',
      status: 200
    })
  }
}
