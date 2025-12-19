import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { newUser } from './types/types';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {

  constructor( @InjectRepository(User) private userRepository: Repository<User> ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { firstName, lastName, email, ...userInformation } = createUserDto
    const userExist: User|null = await this.userRepository.findOneBy({email})
    if(userExist){
      throw new BadRequestException("El usuario con el email usado ya ha sido creado, intenta otro email")
    }
    const newUser: newUser = { 
      ...userInformation,
      email,
      fullName: `${firstName} ${lastName}` 
    }
    const res = await this.userRepository.save(newUser)
    if(!res){
      throw new InternalServerErrorException("No se ha podido crear el usuario.")
    }
    return res;
  }

  async findAll(): Promise<User[]> {
    const user: User[] = await this.userRepository.find() ;
    if(!user){
      throw new InternalServerErrorException("Ha ocurrido un error al buscar los usuarios")
    }
    return user
  }

  async findOne(id: string): Promise<User> {
    const userExist: User|null = await this.userRepository.findOneBy({id}) 
    if(!userExist){
      throw new BadRequestException("No existe un usuario con ese identificador")
    }
    return userExist
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<string> {
    const findingUser = await this.userRepository.findOneBy({id})
    if(!findingUser){
      throw new BadRequestException("No existe un usuario con ese identificador")
    }
    const updateUser = await this.userRepository.update(id, updateUserDto)
    if(!updateUser){
      throw new InternalServerErrorException("Ha ocurrido un error al buscar los usuarios")
    }
    return "Se han actualizado los datso correctamente"
  }

  async remove(id: string): Promise<String> {
    const userExist: User|null = await this.userRepository.findOneBy({id}) 
    if(!userExist){
      throw new BadRequestException("No existe un usuario con ese identificador")
    }
    const deleteUser = this.userRepository.delete({id})
    if(!deleteUser){
      throw new InternalServerErrorException("No se ha podido crear el usuario.")
    }
    return "Se ha borrado el usuario correctamente"
  }
}
