import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { Response } from 'express';
import { userActiveInterface } from 'src/common/interfaces/user-active.interface';

@ApiTags('Autor')
@ApiBearerAuth()
@AuthDecorator([Rol.ADMIN, Rol.TRAINER, Rol.MEMBER])
@Controller('autores')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @ApiOperation({
    summary: 'Crea un Autor'
  })
  @ApiResponse({
    status: 201,
    description: 'Regresa el Autor creado'
  }) 
  @Post()
  async create(
    @Body() createAuthorDto: CreateAuthorDto,
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface
  ) {
    const data = await this.authorService.create(createAuthorDto);
    res.status(HttpStatus.CREATED).json({ 
      data: data,
      message: 'Autor creada correctamente',
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
  async findAll( 
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface) {
      const data = await this.authorService.findAll();

      res.status(HttpStatus.OK).json({
        data,
        message: 'Autores encontrados',
        status: 200
      })
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtiene un Autor'
  })
  @ApiResponse({
    status: 200,
    description: 'Regresa un Autor'
  })
  async findOne(
    @Param('id') id: string,
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface
  ) {
    const data = await this.authorService.findOne(+id);

    res.status(HttpStatus.OK).json({
      data,
      message: 'Autor encontrado',
      status: 200
    })
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualiza una Editorial'
  })
  @ApiResponse({
    status: 200,
    description: 'Regresa la Editorial actualizada'
  })
  async update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface
  ) {
    const data = await this.authorService.update(+id, updateAuthorDto);
    res.status(HttpStatus.OK).json({
      data,
      message: 'Autor actualizado',
      status: 200
    })   
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Elimina un Autor'
  })
  @ApiResponse({
    status: 200,
    description: 'Elimina un Autor'
  })
  async remove(
    @Param('id') id: string,
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface
  ) {
    const data = await this.authorService.remove(+id);

      res.status(HttpStatus.OK).json({
        data,
        message: 'Autor eliminado',
        status: 200
      });
  }
}
