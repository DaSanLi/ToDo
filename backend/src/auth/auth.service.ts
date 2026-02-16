import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/auth-login.dto';
import { UserClass, userResponse } from './scripts/auth.types';
import { verifyHashPassword } from './scripts/auth.scripts';
import { JwtService } from '@nestjs/jwt';
import { BadRequestFunction } from '../task/scripts/task.scripts';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<userResponse>,
        private readonly jwtService: JwtService
    ) { }


    async loginUser(body: LoginDto): Promise<UserClass> {
        const { email } = body;
        const user = await this.userRepository.findOneBy({ email });
        //verificacion de usuario valido
        if (!user) {
            throw new BadRequestException("Usuario no encontrado")
        }
        // verificacion de contraseña
        const passwordVerified = await verifyHashPassword(body.password, user.password)
        // si la variable es falsy enviara error 4xx
        if(!passwordVerified) return BadRequestFunction("La contraseña ingresada no coincide con la registrada")
        // gestion para crear JWT token
        const payload = { email: user.email }
        const token = await this.jwtService.signAsync(payload)
        //se gestiona los datos que se ennviaran dentro de la respuesta
        const response = { email: user.email, token: token }
        return response
    }


        async registerUser(body: CreateUserDto): Promise<UserClass> {
        const { email } = body;
        const user = await this.userRepository.findOneBy({ email });
        //verificacion de usuario valido
        if (!user) {
            throw new BadRequestException("Usuario no encontrado")
        }
        // verificacion de contraseña
        const passwordVerified = await verifyHashPassword(body.password, user.password)
        // si la variable es falsy enviara error 4xx
        if(!passwordVerified) return BadRequestFunction("La contraseña ingresada no coincide con la registrada")
        // gestion para crear JWT token
        const payload = { username: user.email }
        const token = await this.jwtService.signAsync(payload)
        //se gestiona los datos que se ennviaran dentro de la respuesta
        const response = { email: user.email, token: token }
        return response
    }

}

