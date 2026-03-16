import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/auth-login.dto';
import { UserClass, userResponse, VerificationResponse, ResponseWithCookie, payloadType } from './scripts/auth.types';
import { hashPassword, verifyHashPassword } from './scripts/auth.scripts';
import { AuthCookiesService } from './scripts/auth-cookies.service';
import { JwtService } from '@nestjs/jwt';
import { BadRequestFunction, InternalExpectionFunction } from '../task/scripts/task.scripts';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<userResponse>,
        private readonly jwtService: JwtService,
        private readonly authCookiesService: AuthCookiesService
    ) { }


    async loginUser(body: LoginDto, res: ResponseWithCookie): Promise<payloadType> {
        const { email } = body;
        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            throw new BadRequestException("Usuario no encontrado")
        }
        const passwordVerified = await verifyHashPassword(body.password, user.password)
        if (!passwordVerified) return BadRequestFunction("La contraseña ingresada no coincide con la registrada")
        
        const payload = { email: user.email }
        const token = await this.jwtService.signAsync(payload)
        
        // this.authCookiesService.setTokenCookie(res, token)
        
        return { email, token }
    }


    async registerUser(body: CreateUserDto, res: ResponseWithCookie): Promise<UserClass> {
        const { email } = body;
        const user = await this.userRepository.findOneBy({ email });
        if (user) {
            throw new BadRequestException("Email en uso, ingresa otro")
        }
        
        const passwordHashed = await hashPassword(body.password)
        body.password = passwordHashed
        if (!passwordHashed) return BadRequestFunction("Ha ocurrido un error en el registro, vuelve a internarlo")
        
        const newUser = await this.userRepository.save(body)
        if (!newUser) return InternalExpectionFunction("No se ha podido registrar al usuario")
        
        const payload = { email: body.email }
        const token = await this.jwtService.signAsync(payload)
        
        this.authCookiesService.setTokenCookie(res, token)
        
        return { email: body.email }
    }

    async findUserByEmail(email: string): Promise<userResponse | null> {
        return await this.userRepository.findOneBy({ email });
    }

    async verifyAndRefreshToken(cookies: Record<string, string>, res: ResponseWithCookie): Promise<VerificationResponse> {
        const payload = await this.authCookiesService.verifyTokenFromCookie({ cookies } as any);

        const user = await this.userRepository.findOneBy({ email: payload.email });

        if (!user) {
            throw new UnauthorizedException('Usuario no encontrado');
        }

        const newPayload = { email: user.email };
        const newToken = await this.jwtService.signAsync(newPayload);
        this.authCookiesService.setTokenCookie(res, newToken);

        return {
            email: user.email,
            message: 'Verificación exitosa',
        };
    }

}

