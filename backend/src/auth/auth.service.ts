import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { LoginUserDto } from './dto/login-auth.dto';
import { payloadType, userServiceResponse } from './scripts/scripts-types';
import { hashPassword, verifyPassword } from './scripts/scripts';
import { RegisterUserDto } from './dto/register-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';


@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}


  async login(LoginUserDto: LoginUserDto): Promise<userServiceResponse> {
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
    const payload = { _id: userExist._id }
    const token = await this.jwtService.signAsync(payload)
    //se gestiona los datos que se ennviaran dentro de la respuesta
    let response: userServiceResponse = { 
      email,
      gender: userExist.gender, 
      fullName: userExist.email, 
      token 
    }
    return response
  }


  async register(createUserDto: RegisterUserDto): Promise<userServiceResponse> {
    const { email, gender, fullName, password } = createUserDto
    const userExist: User | null = await this.userModel.findOne({ email })
    if (!userExist) {
      throw new BadRequestException("El usuario con el email usado ya ha sido creado, intenta otro email")
    }
    const hashedPassword = await hashPassword(password)
    if (!hashedPassword) {
      throw new BadRequestException("La contraseña ingresada es incorrecta")
    }
    const newUser: RegisterUserDto = {
      fullName,
      gender,
      email,
      password: hashedPassword
    }
      const userInstance = new this.userModel(newUser);
      await userInstance.save()
    if (!userInstance) {
      throw new InternalServerErrorException("No se ha podido crear el usuario.")
    }
    const payload = { email, _id: userExist._id }
    const token = await this.jwtService.signAsync(payload)
    return { fullName, email, gender, token }
  }
}
