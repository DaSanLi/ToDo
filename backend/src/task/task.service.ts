import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity'
import { User } from '../users/entities/user.entity'
import { BadRequestFunction, InternalExpectionFunction, UnauthorizedFunction } from './scripts/task.scripts';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task) private readonly TaskRepository: Repository<Task>,
    @InjectRepository(User) private readonly UserRepository: Repository<User>) { }


  async createTask(CreateTaskDto: CreateTaskDto, { email }: { email: string }): Promise<string> {
    const user = await this.UserRepository.findOneBy({ email })
    if (!user) return BadRequestFunction("El usuario no esta registrado o fue eliminado.")
    const newTask = { ...CreateTaskDto, user: user }
    try {
      await this.TaskRepository.save(newTask)
    } catch {
      InternalExpectionFunction("Ha ocurrido un error al registrar la tarea, vuelve a intentarlo.")
    }
    return "Tarea creada correctamente"
  }



  async findAllTask({ email }: { email: string }): Promise<Task[]> {
    const user: User | null = await this.UserRepository.findOne({ where: { email }, relations: ['tasks'] })
    if (!user) return BadRequestFunction("No se ha podido encontrar al usuario, vuelve a intentarlo")
    const { tasks } = user
    if (!tasks) return InternalExpectionFunction("No se han podido carga las tareas de este usuario")
    return tasks
  }


  async findOneTask(id: string, { email }: { email: string }): Promise<CreateTaskDto> {
    const task: Task | null = await this.TaskRepository.findOne({ where: { id }, relations: ['user'] })
    if (!task) return BadRequestFunction("No se ha encontrado ninguna tarea")
    const unauthorizedUser = email === task.user.email ? email : ""
    if (unauthorizedUser) return UnauthorizedFunction("Solo el creador de la tarea puede ver la misma")
    return task
  }


  async updateTask(id: string, updateTaskDto: UpdateTaskDto, { email }: { email: string }): Promise<string> {
    const task: Task | null = await this.TaskRepository.findOne({ where: { id }, relations: ['user'] })
    if(!task) return BadRequestFunction("No se ha encontrado ninguna tarea")
    //si el username pasado por el token no coincide con el guardado en la relación user - task aplicará excepción
    const unauthorizedUser = email === task?.user?.email ? task?.user : ""
    if(unauthorizedUser) return UnauthorizedFunction("Solo el creador de la tarea puede modificar la misma")
    try {
      await this.TaskRepository.update(id, { ...updateTaskDto })
    } catch {
      InternalExpectionFunction("La tarea no se ha podido modificar")
    }
    return "Tarea modificada satisfactoriamente";
  }


  async removeTask(id: string, { email }: { email: string }): Promise<string> {
    const task: Task | null = await this.TaskRepository.findOne({ where: { id }, relations: ['user'] })
    if (!task) return BadRequestFunction("No se ha encontrado ninguna tarea")
    const unauthorizedUser = email === task?.user?.email ? task?.user : ""
    if(!unauthorizedUser) return UnauthorizedFunction("Solo el creador de la tarea puede eliminar la misma")
    try {
      await this.TaskRepository.remove(task)
    } catch {
      InternalExpectionFunction("Error al borrar la tarea")
    }
    return "Tarea borrada satisfactoriamente"
  }
}
