import { Controller, Post, Body, HttpCode} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-auth.dto';
import { RegisterUserDto } from './dto/register-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Post('login')
  @HttpCode(200)
  login(@Body() LoginUserDto: LoginUserDto) {
    return this.authService.login(LoginUserDto);
  }


  @Post('register')
  register(@Body() LoginUserDto: RegisterUserDto) {
    return this.authService.register(LoginUserDto);
  }

}
