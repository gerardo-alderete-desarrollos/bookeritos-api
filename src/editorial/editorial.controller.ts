import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { EditorialService } from './editorial.service';
import { CreateEditorialDto } from './dto/create-editorial.dto';
import { UpdateEditorialDto } from './dto/update-editorial.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { userActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Response } from 'express';

@ApiTags('Editorial')
//@ApiBearerAuth()
//@AuthDecorator([Rol.ADMIN, Rol.SUPERVISOR, Rol.MEMBER])
@Controller('editoriales')
export class EditorialController { 
  constructor(private readonly editorialService: EditorialService) {}

  @Post()
  @ApiBearerAuth()
  @AuthDecorator([Rol.ADMIN, Rol.SUPERVISOR, Rol.MEMBER])
  @ApiOperation({
    summary: 'Crea una Editorial'
  })
  @ApiResponse({
    status: 201,
    description: 'Regresa la Editorial creada'
  }) 
  async create(
    @Body() createEditorialDto: CreateEditorialDto,
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface) {

    const data = await this.editorialService.create(createEditorialDto);
    res.status(HttpStatus.CREATED).json({ 
      data: data,
      message: 'Editorial creada correctamente',
      status: 201
    })
  }

  @Get()
  @ApiOperation({
    summary: 'Obtiene todos las Editoriales'
  })
  @ApiResponse({
    status: 200,
    description: 'Regresa todas las Editoriales'
  })
  @Get()
  async findAll(
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface
  ) {
    const data = await this.editorialService.findAll();

    res.status(HttpStatus.OK).json({
      data,
      message: 'Editoriales encontradas',
      status: 200
    })
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtiene una Editorial'
  })
  @ApiResponse({
    status: 200,
    description: 'Regresa una Editorial'
  })
  async findOne(
    @Param('id') id: string, 
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface
  ) {
    const data = await this.editorialService.findOne(id);

    res.status(HttpStatus.OK).json({
      data,
      message: 'Editorial encontrada',
      status: 200
    })
  }

  @Patch(':id')
  @ApiBearerAuth()
  @AuthDecorator([Rol.ADMIN, Rol.SUPERVISOR, Rol.MEMBER])
  @ApiOperation({
    summary: 'Actualiza una Editorial'
  })
  @ApiResponse({
    status: 200,
    description: 'Regresa la Editorial actualizada'
  })
  async update(
    @Param('id') id: string, 
    @Body() updateEditorialDto: UpdateEditorialDto,
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface
  ) {
    const data = await this.editorialService.update(id, updateEditorialDto);
    res.status(HttpStatus.OK).json({
      data,
      message: 'Editorial actualizada',
      status: 200
    })  
  }

  @Delete(':id')
  @ApiBearerAuth()
  @AuthDecorator([Rol.ADMIN, Rol.SUPERVISOR, Rol.MEMBER])
  @ApiOperation({
    summary: 'Elimina una Editorial'
  })
  @ApiResponse({
    status: 200,
    description: 'Elimina una Editorial'
  })
  async remove(
    @Param('id') id: string,
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface) {

      const data = await this.editorialService.remove(id);

      res.status(HttpStatus.OK).json({
        data,
        message: 'Editorial eliminada',
        status: 200
      });
  }
}
