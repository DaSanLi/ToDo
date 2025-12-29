import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../user/entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './entities/task.entity';
import { _idTransform } from './utilities/scripts';

@Injectable()
export class TasksService {

  constructor (
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Task.name) private tasksModel: Model<Task>
  ) {}

  async create(createTaskDto: CreateTaskDto, user_id: object): Promise<object> {
    const userExist = await this.userModel.findOne({user_id})
    if(!userExist){
      throw new BadRequestException("No hay usuario registrado con ese email")
    }
    createTaskDto.user = user_id
    let tasksInstance = new this.tasksModel(createTaskDto);
    try{
      await tasksInstance.save()
    }catch{
      throw new InternalServerErrorException("Ha ocurrido un error al guardar la tarea")
    }
    return {"message": "Tarea creada correctamente"};
  }

  async findAll(user_id: object): Promise<Task[]> {
    const userExist = await this.userModel.findById(user_id)
    if(!userExist){
      throw new InternalServerErrorException("Ha ocurrido un error")
    }
    const tasks = await this.tasksModel.find({ user: user_id });
    if(!tasks){
      throw new InternalServerErrorException("Ha ocurrido un error al encontrar las tareas asociadas al usuario")
    }
    return tasks;
  }


  async findOne(id: string, user_id: object): Promise<Task> {
    const userExist = await this.userModel.findById(user_id)
    if(!userExist){
      throw new InternalServerErrorException("Ha ocurrido un error")
    }
    const _id: object = _idTransform(id);
    const task = await this.tasksModel.findOne(_id);
    if(!task){
      throw new InternalServerErrorException("Ha ocurrido un error al encontrar las tareas asociadas al usuario")
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto, user_id: object): Promise<object> {
    const userExist = await this.userModel.findById(user_id)
    if(!userExist){
      throw new InternalServerErrorException("Ha ocurrido un error")
    }
    const _id: object = _idTransform(id);
    try{
      await this.tasksModel.updateOne({_id}, updateTaskDto);
    }catch{
      throw new InternalServerErrorException("Ha ocurrido un error al encontrar las tareas asociadas al usuario")
    }
    return {"message": "Usuario modificado correctamente"};
  }


  async remove(id: string, user_id: object): Promise<object> {
    const userExist = await this.userModel.findById(user_id)
    if(!userExist){
      throw new InternalServerErrorException("Ha ocurrido un error")
    }
    const _id: object = _idTransform(id);
    try{
      await this.tasksModel.deleteOne(_id);
    }catch{
      throw new InternalServerErrorException("Ha ocurrido un error al encontrar las tareas asociadas al usuario")
    }
    return {"message": "Usuario modificado correctamente"};
  }
}