import { Controller, Post, Body, HttpCode, Res, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-auth.dto';
import { RegisterUserDto } from './dto/register-auth.dto';
import type { Response, Request} from 'express';
import { attachAuthCookie } from './scripts/scripts';
import { _idTransformRequest } from '../tasks/utilities/scripts';
import { AuthGuard } from './guard/auth.guard';

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


  @UseGuards(AuthGuard)
  @Get('me')
  async me( @Req() request: Request ) {
    console.log("ha entrado con al endpoint me")
    const res = await this.authService.me(_idTransformRequest(request.user?._id, request));
    return res
  }


  @UseGuards(AuthGuard)
  @Get('logout')
  async logout( 
    @Res({ passthrough: true }) response: Response
  ) {
    response.clearCookie('auth_token')
  }

}
