import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Task } from '../task/entities/task.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashPassword } from '../auth/scripts/auth.scripts';
import { BadRequestFunction, InternalExpectionFunction } from './scripts/users.scripts';

//aqui se realiza el crud para user
@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private readonly UserRepository: Repository<User>,
    @InjectRepository(Task) private readonly TaskRepository: Repository<Task>
  ) { }


  async createUser(body: CreateUserDto): Promise<User> {
    const passwordHashed = await hashPassword(body.password)
    body.password = passwordHashed
    const newUser = await this.UserRepository.save(body)
    if (!newUser) return InternalExpectionFunction("No se ha podido registrar al usuario")
    return newUser;
  }


  async findAllUsers(): Promise<User[]> {
    return await this.UserRepository.find();
  }


  async findOneUser(id: string): Promise<User> {
    const user = await this.UserRepository.findOneBy({ id });
    if (!user) return BadRequestFunction("No se ha encontrado un usuario referente")
    return user
  }


  async updateUser(id: string, body: UpdateUserDto): Promise<string> {
    const user = await this.UserRepository.findOneBy({ id });
    if (!user) return BadRequestFunction("No se ha encontrado un usuario referente")
    let passwordHashed: string | null = null
    if (body?.password) {
      passwordHashed = await hashPassword(body?.password)
      body.password = passwordHashed
    }
    const updatedUser = await this.UserRepository.update(id, { ...body });
    if(!updatedUser) return InternalExpectionFunction("No se ha podido actualizar el usuario")
    return "Usuario actualizado con exito";
  }


  async softDeleteUSer(id: string): Promise<string> {
    const user = await this.UserRepository.findOneBy({ id });
    const fecha = new Date()
    if (!user) return BadRequestFunction("Usuario no encontrado")
    const deleteUser = await this.UserRepository.softDelete({ id })
    const tasksResult = await this.TaskRepository
      .createQueryBuilder()
      .update()
      .set({ deletedAt: fecha })
      .where('userId = :id', { id })
      .execute()
    if(!deleteUser) return InternalExpectionFunction("El usuario no se pudo borrar")
    if(!tasksResult) return InternalExpectionFunction("No se pudo borrar las tareas")
    return "Se realizo el borrado blando del usuario satisfactoriamente"
  }


  async cancelSoftDelete(id: string): Promise<string> {
    //se busca a los usuarios previamente borrados
    const usersDeletedRepository = await this.UserRepository.find({ withDeleted: true, where: { deletedAt: Not(IsNull()) } })
    //testifico si el id enviado esta dentro del los  usuarios eliminados
    const userIsDeleted = usersDeletedRepository.find((users) => String(users.id) === String(id))
    // console.log(userIsDeleted, "usuario cancel soft deleted")
    if (!userIsDeleted) return BadRequestFunction("Usuario no encontrado en la lista de borrado blando")
    //se restauran los datos del usuario
    const userResult = await this.UserRepository.restore({ id })
    const tasksResult = await this.TaskRepository
      .createQueryBuilder()
      .update()
      .set({ deletedAt: null })
      .where('userId = :id', { id })
      .execute()
    if(!userResult) return InternalExpectionFunction("No se pudo sacar al usuario de la lista de eliminados")
    if(!tasksResult) return InternalExpectionFunction("No se pudo recuperar la lista de tareas borradas")
    return "Se quito al usuario de la lista de borrado blando satisfactoriamente"
  }


  //esta logica sera usada por REST API
  async hardDelete(id: string): Promise<string> {
    const user = await this.UserRepository.findOneBy({ id });
    if (!user) return BadRequestFunction("Usuario no encontrado")
    try {
      await this.UserRepository.remove(user);
    } catch {
      InternalExpectionFunction("No se ha podido borrar al usuario")
    }
    return "Usuario borrado satisfactoriamente"
  }

}
