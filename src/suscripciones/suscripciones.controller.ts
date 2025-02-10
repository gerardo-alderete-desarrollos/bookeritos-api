import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { SuscripcionesService } from './suscripciones.service';
import { CreateSuscripcioneDto } from './dto/create-suscripcione.dto';
import { UpdateSuscripcioneDto } from './dto/update-suscripcione.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthDecorator } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { Response } from 'express';
import { userActiveInterface } from 'src/common/interfaces/user-active.interface';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';

@Controller('suscripciones')
export class SuscripcionesController {
  constructor(private readonly suscripcionesService: SuscripcionesService,
  ) {}

  @ApiOperation({
    summary: 'Obtiene todas la suscripciones'
  })
  @ApiBearerAuth()
  @AuthDecorator([Rol.ADMIN, Rol.SUPERVISOR, Rol.MEMBER])
  @Get()
  async findAll(@Res() res: Response) {
    const data = await  this.suscripcionesService.findAll(); 

       return res.status(HttpStatus.OK).json({
          data,
          message: `Se obtuvieron ${data.length} Suscripciones`,
          status: 200
        })
  }

  


  /* @Post() 
  create(@Body() createSuscripcioneDto: CreateSuscripcioneDto) {
    return this.suscripcionesService.create(createSuscripcioneDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suscripcionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuscripcioneDto: UpdateSuscripcioneDto) {
    return this.suscripcionesService.update(+id, updateSuscripcioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suscripcionesService.remove(+id);
  } */
}
