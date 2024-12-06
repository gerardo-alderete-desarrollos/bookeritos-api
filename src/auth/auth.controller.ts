import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Rol } from '../common/enums/rol.enum';
import { ActiveUser } from './../common/decorators/active-user.decorator';
import { userActiveInterface } from './../common/interfaces/user-active.interface';
import { AuthService } from './auth.service';
import { AuthDecorator } from './decorators/auth.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ){}

    @Post('singin')
    @ApiOperation({
        summary: 'Creación de Usuario'
    })
    @ApiBearerAuth()
    @AuthDecorator([Rol.ADMIN, Rol.TRAINER, Rol.MEMBER])
    async register(
        @Body() body: RegisterDto, 
        @Res() res : Response, 
        @ActiveUser() us: userActiveInterface){
         const user = await this.authService.register(body,us);
        return res.status(HttpStatus.OK).json({
            data: user,
            message: 'Usuario Creado correctamente',
            status: 200
        })
    }

    @Post('login')
    @ApiOperation({
        summary: 'Inicio de sesion para devolver Token'
    })
    async login(@Body() body: LoginDto, @Res() res: Response){
        const data = await this.authService.login(body);
        return res.status(HttpStatus.OK).json({
            data,
            message: 'Usuario logeado correcatmente',
            status: 200
        })
    }

    @Get('profile')
    @ApiOperation({
        summary: 'Obtiene la informacion del perfil del usuario'
    })
    @ApiBearerAuth()
    @AuthDecorator([Rol.ADMIN, Rol.TRAINER])
    profile(@ActiveUser() user: userActiveInterface){

        return this.authService.profile(user);
    }


}
