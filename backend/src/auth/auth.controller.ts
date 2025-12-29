import { Controller, Post, Body, HttpCode, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-auth.dto';
import { RegisterUserDto } from './dto/register-auth.dto';
import type { Response } from 'express';
import { attachAuthCookie } from './scripts/scripts';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('login')
  @HttpCode(200)
  async login(
    @Body() dto: LoginUserDto,
    @Res({ passthrough: true }) response: Response
  ) {
    const { email, token, ...serviceResponse } = await this.authService.login(dto);
    attachAuthCookie(response, token)
    return { email, ...serviceResponse };
  }


  @Post('register')
  async register( 
    @Body() dto: RegisterUserDto, 
    @Res({ passthrough: true }) response: Response
  ) {
    const { email, token, ...serviceResponse } = await this.authService.login(dto);
    attachAuthCookie(response, token)
    return { email, ...serviceResponse };
  }

}
