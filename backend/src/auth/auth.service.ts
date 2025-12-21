import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { LoginUserDto } from './dto/login-auth.dto';
import { hashPassword, verifyPassword } from './scripts/scripts';
import { RegisterUserDto } from './dto/register-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class AuthService {

  constructor(@InjectModel(User.name) private userModel: Model<User>) {}


  async login(LoginUserDto: LoginUserDto): Promise<User> {
    const { email, password } = LoginUserDto
    const userExist: User | null = await this.userModel.findOne({ email })
    if (!userExist) {
      throw new BadRequestException("Email no encontrado")
    }
    //si la contraseña no coincide lanza una excepción 4xx
    const verificationPassword = await verifyPassword(password, userExist.password)
    if (!verificationPassword) {
      throw new BadRequestException("La contraseña ingresada es incorrecta")
    }
    return userExist;
  }


  async register(createUserDto: RegisterUserDto): Promise<User> {
    const { email, password, ...userInformation } = createUserDto
    const userExist: User | null = await this.userModel.findOne({ email })
    if (userExist) {
      throw new BadRequestException("El usuario con el email usado ya ha sido creado, intenta otro email")
    }
    const hashedPassword = await hashPassword(createUserDto.password)
    if (!hashedPassword) {
      throw new BadRequestException("La contraseña ingresada es incorrecta")
    }
    const newUser: RegisterUserDto = {
      ...userInformation,
      email,
      password: hashedPassword,
    }
      const userInstance = new this.userModel(newUser);
      await userInstance.save()
    if (!userInstance) {
      throw new InternalServerErrorException("No se ha podido crear el usuario.")
    }
    return userInstance;
  }
}
