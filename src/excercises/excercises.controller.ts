import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthDecorator } from '../auth/decorators/auth.decorator';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { Rol } from '../common/enums/rol.enum';
import { userActiveInterface } from '../common/interfaces/user-active.interface';
import { CreateExcerciseDto } from './dto/create-excercise.dto';
import { UpdateExcerciseDto } from './dto/update-excercise.dto';
import { ExcercisesService } from './excercises.service';


@ApiTags('Excercises')
@ApiBearerAuth()
@AuthDecorator([Rol.ADMIN, Rol.TRAINER, Rol.MEMBER])
@Controller('excercises')
export class ExcercisesController {
  constructor(private readonly excercisesService: ExcercisesService) {}

  @Post()
  @ApiOperation({
    summary: 'Crea un Ejercicio'
  })
  @ApiResponse({
    status: 201,
    description: 'Regresa el Ejercicio creado'
  })
  async create(
    @Body() createExcerciseDto: CreateExcerciseDto, 
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface) {
      const data = await this.excercisesService.create(createExcerciseDto, user);

      res.status(HttpStatus.CREATED).json({ 
        data: data,
        message: 'Ejercicio creado correctamente',
        status: 201
      })
  }

  @Get()
  @ApiOperation({
    summary: 'Obtiene todos los Ejercicios'
  })
  @ApiResponse({
    status: 200,
    description: 'Regresa todos los Ejercicios'
  })
  async findAll(
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface
  ) {

    const data = await this.excercisesService.findAll(user);

    res.status(HttpStatus.OK).json({
      data,
      message: 'Ejercicios encontrados',
      status: 200
    })
  }
 
  @Get(':id')
  @ApiOperation({
    summary: 'Obtiene un Ejercico'
  })
  @ApiResponse({
    status: 200,
    description: 'Regresa un Ejercicio'
  })
  async findOne(
    @Param('id') id: string, 
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface) {
    const data = await this.excercisesService.findOne(+id, user);

    res.status(HttpStatus.OK).json({
      data,
      message: 'Ejercicio encontrado',
      status: 200
    })
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualiza un Ejercicios'
  })
  @ApiResponse({
    status: 200,
    description: 'Regresa el Ejercicio actualizado'
  })
  async update(
    @Param('id') id: string, 
    @Body() updateExcerciseDto: UpdateExcerciseDto,
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface) {
    const data = await this.excercisesService.update(+id, updateExcerciseDto, user);
    res.status(HttpStatus.OK).json({
      data,
      message: 'Ejercicio actualizado',
      status: 200
    })
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Elimina un Ejercicio'
  })
  @ApiResponse({
    status: 200,
    description: 'Elimina un Ejercicio'
  })
  async remove(
    @Param('id') id: string,
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface) {
    const data = await this.excercisesService.remove(+id, user);

    res.status(HttpStatus.OK).json({
      data,
      message: 'Ejercicio eliminado',
      status: 200
    })
  }
}
