import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { userActiveInterface } from '../common/interfaces/user-active.interface';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ){

    }
    async register({name, email, password, rol}: RegisterDto,  us: userActiveInterface){
        console.log('email', email)
        const user = await this.usersService.findOneByEmail(email);

        if( user ){
            throw new BadRequestException('User already exists')
        }
        
        await this.usersService.create({
            name,
            email, 
            password,
            rol
        }, us);

        return {
            name,
            email,
            rol
        }
    }

    async login({email, password}: LoginDto) {
        console.log('USUARIO', email);
        const user = await this.usersService.findByEmailWithPassword(email);
        if( !user ){
            throw new UnauthorizedException('email is wrong')
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if( !isPasswordValid ) {
            throw new UnauthorizedException('Password is wrong');
        }

        const payload = { email: user.email, rol: user.rol };

        const token = await this.jwtService.signAsync(payload);

        return {
            token,
            user: {
                name: user.name,
                email: user.email,
                rol: user.rol,
                id: user.id,
                deleteAt: user.deleteAt,
            }
        };
    }

    async profile({email, rol}: {email: string, rol:string}){

        return await this.usersService.findOneByEmail(email);
    }

}
