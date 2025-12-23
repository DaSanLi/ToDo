import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashPassword } from '../auth/scripts/scripts';

@Injectable()
export class UserService {


  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) {}


  async create(createUserDto: CreateUserDto): Promise<string> {
    const { email, password, ...userInformation } = createUserDto
    const userExist = await this.userModel.findOne({email})
    if(userExist){
      throw new BadRequestException("El usuario con el email usado ya ha sido creado, intenta otro email")
    }
    const hashedPassword = await hashPassword(createUserDto.password)
    if(!hashedPassword){
      throw new InternalServerErrorException("No se ha podido crear el usuario.")
    }
    const newUser: CreateUserDto = { 
      ...userInformation,
      email,
      password: hashedPassword
    }
    try{
      const userInstance = new this.userModel(newUser);
      await userInstance.save()
    }catch{
      throw new InternalServerErrorException("No se ha podido crear el usuario.")
    }
    return "Usuario creado correctamente"
  }


  async findAll(): Promise<User[]> {
    const user: User[] = await this.userModel.find().exec();
    if(!user){
      throw new InternalServerErrorException("Ha ocurrido un error al buscar los usuarios")
    }
    return user
  }


  async findOne(_id: string): Promise<User> {
    const userExist: User|null = await this.userModel.findOne({_id}) 
    if(!userExist){
      throw new BadRequestException("No existe un usuario con ese identificador")
    }
    return userExist
  }


  async update(_id: string, updateUserDto: UpdateUserDto): Promise<string> {
    const userExist: User|null = await this.userModel.findOne({_id}) 
    if(!userExist){
      throw new InternalServerErrorException("Ha ocurrido un error al actualizar la contraseña")
    }
    if(updateUserDto?.password){
      const hashedPassword = await hashPassword(updateUserDto?.password)
      if(!hashedPassword){
        throw new BadRequestException("La contraseña ingresada es incorrecta")
      }
      updateUserDto = {
        password: hashedPassword
      }
    }
    try{
      await this.userModel.findByIdAndUpdate(_id, updateUserDto, {new: true})
    }catch{
      throw new InternalServerErrorException("Ha ocurrido un error al actualizar el usuario")
    }
    return "Se han actualizado los datso correctamente"
  }


  async remove(_id: string): Promise<String> {
    const userExist: User|null = await this.userModel.findOne({_id}) 
    if(!userExist){
      throw new BadRequestException("No existe un usuario con ese identificador")
    }
    try{
      await this.userModel.deleteOne({_id})
    }catch{
      throw new InternalServerErrorException("No se ha podido crear el usuario.")
    }
    return "Se ha borrado el usuario correctamente"
  }
}
