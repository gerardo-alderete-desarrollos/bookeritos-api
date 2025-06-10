import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res } from '@nestjs/common';
import { UsuarioSuscripcionesService } from './usuario-suscripciones.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthDecorator } from 'src/auth/decorators/auth.decorator';
import { Rol } from 'src/common/enums/rol.enum';
import { CreateUsuarioSuscripcionesDto } from './dto/create-usuario-suscripcione.dto';
import { userActiveInterface } from 'src/common/interfaces/user-active.interface';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { Response } from 'express';
import { Estatus } from 'src/common/enums/estatus.enum';
import { UpdateUsuarioSuscripcioneDto } from './dto/update-usuario-suscripcione.dto';

@Controller('usuario-suscripciones') 
export class UsuarioSuscripcionesController {
  constructor(private readonly usuarioSuscripcionesService: UsuarioSuscripcionesService) {}

  @ApiOperation({
    summary: 'Se agrega una suscripcion a un usuario'
  })
  @ApiBearerAuth()
  @AuthDecorator([Rol.ADMIN, Rol.SUPERVISOR, Rol.MEMBER])
  @Post() 
  async createUsuarioSuscripcion(
    @Body() createUsuarioSuscripcionDto: CreateUsuarioSuscripcionesDto,
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface
    ) { 
      try{
        const data = await  this.usuarioSuscripcionesService.createUsuarioSuscripcion(createUsuarioSuscripcionDto); 
        return res.status(HttpStatus.CREATED).json({
          data,
          message: `Se agrego la suscripcion correctamente` ,
          status: 201
        })
        
      } catch(err){
        
      }

  }

  @ApiOperation({
    summary: 'Obtiene todas la suscripciones'
  })
  //@ApiBearerAuth()
  //@AuthDecorator([Rol.ADMIN, Rol.SUPERVISOR, Rol.MEMBER])
  @Get(':id')
  async findSuscriptionsByUser(@Res() res: Response,@Param('id') id: string) {
    const data = await  this.usuarioSuscripcionesService.findOne(id); 

       return res.status(HttpStatus.OK).json({
          data,
          message: data.length > 0 ? `Se obtuvieron ${data.length} Suscripciones` : 'No se encontraron suscripciones para este usuario',
          status: 200
        }) 
  }

  @ApiOperation({
    summary: 'Obtiene todas la suscripciones'
  })
  //@ApiBearerAuth()
  //@AuthDecorator([Rol.ADMIN, Rol.SUPERVISOR, Rol.MEMBER])
  @Get()
  async findUsersSuscriptions(@Res() res: Response) {
    const data = await  this.usuarioSuscripcionesService.findHistorialSuscription(); 
       return res.status(HttpStatus.OK).json({
          data,
          message: `Se obtuvieron ${data.length} Suscripciones`,
          status: 200
        })
  }

  @ApiOperation({
    summary: 'Obtiene todas la suscripciones'
  })
  //@ApiBearerAuth()
  //@AuthDecorator([Rol.ADMIN, Rol.SUPERVISOR, Rol.MEMBER])
  @Patch('/estatus/:id')
  async changeStatus(
    @Param('id') id: string,
    @Body() body: { estatus: Estatus | any},
    @Res() res: Response) {
      
      
    const data = await this.usuarioSuscripcionesService.changeStatusSuscription(id, body.estatus);
    return res.status(HttpStatus.OK).json({
      data,
      message: `Se actualizo el estatus correctamente`,
      status: 200
    })
  }

  @ApiOperation({
    summary: 'Actualiza la suscripcion de un usuario'
  })
  @ApiBearerAuth()
  @AuthDecorator([Rol.ADMIN, Rol.SUPERVISOR, Rol.MEMBER])
  @Patch('/updateUsuarioSuscripcion')
  async updateUsuarioSuscripcion(
    @Body() body: UpdateUsuarioSuscripcioneDto,
    @Res() res: Response) {
      
      
    const data = await this.usuarioSuscripcionesService.updateUsuarioSuscripcion(body);
    return res.status(HttpStatus.OK).json({
      data,
      message: `Se actualizo los parametros de la suscripcion actual del usuario`,
      status: 200
    })
  }


 /*  @Post()
  create(@Body() createUsuarioSuscripcioneDto: CreateUsuarioSuscripcioneDto) {
    return this.usuarioSuscripcionesService.create(createUsuarioSuscripcioneDto);
  }

  @Get()
  findAll() {
    return this.usuarioSuscripcionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioSuscripcionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioSuscripcioneDto: UpdateUsuarioSuscripcioneDto) {
    return this.usuarioSuscripcionesService.update(+id, updateUsuarioSuscripcioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioSuscripcionesService.remove(+id);
  } */
}
