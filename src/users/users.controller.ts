import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AuthDecorator } from '../auth/decorators/auth.decorator';
import { ActiveUser } from '../common/decorators/active-user.decorator';
import { Rol } from '../common/enums/rol.enum';
import { userActiveInterface } from '../common/interfaces/user-active.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({
    summary: 'Creas un Usuario'
  })
  @ApiBearerAuth()
  @AuthDecorator([Rol.ADMIN, Rol.SUPERVISOR])
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface
  ) {    
    const data = await this.usersService.create(createUserDto, user);

    res.status(HttpStatus.OK).json({
      data,
      message: 'Usuario creado correctamente',
      status: 200
    })
  }

  @Get()
  @ApiOperation({
    summary: 'Obtienes todos los usuarios'
  })
  @ApiBearerAuth()
  @AuthDecorator([Rol.ADMIN, Rol.SUPERVISOR])
  async findAll(
    @Res() res: Response, 
    @ActiveUser() user: userActiveInterface
  ) {
    const data = await this.usersService.findAll(user);

    return res.status(HttpStatus.OK).json({
      data,
      message: `Se obtuvieron ${data.length} usuarios`,
      status: 200
    })
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Encuentras un usuario'
  })
  @ApiBearerAuth()
  @AuthDecorator([Rol.ADMIN, Rol.SUPERVISOR, Rol.MEMBER])
  async findOne( 
    @Param('id') id: string,
    @Res() res: Response,
    @ActiveUser() user: userActiveInterface) {
      

    const data = await this.usersService.findOne(+id, user);
    return res.status(HttpStatus.OK).json({
      data,
      message: 'Usuario cargado correctamente',
      status: 200
    })
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizas un usuario'
  })
  @ApiBearerAuth()
  @AuthDecorator([Rol.ADMIN, Rol.SUPERVISOR, Rol.MEMBER])
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @ActiveUser() user: userActiveInterface,
    @Res() res: Response
    ) {

    const data = await this.usersService.update(+id, updateUserDto, user);

    return res.status(HttpStatus.OK).json({
      data,
      message: 'Usuario Actualizado correctamente',
      status: 200
    })
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminas un usuario'
  })
  @ApiBearerAuth()
  @AuthDecorator([Rol.ADMIN, Rol.SUPERVISOR])
  async remove(
    @Param('id') id: string,
    @ActiveUser() user: userActiveInterface,
    @Res() res: Response) {
    const data = await this.usersService.remove(+id, user);

    return res.status(HttpStatus.OK).json({
      data,
      message: 'Usuario Eliminado correctamente',
      status: 200
    })
  }
}
