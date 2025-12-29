import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, ValidationPipe, UsePipes } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import type { Request } from 'express';
import { _idTransformRequest } from './utilities/scripts';

@UseGuards(AuthGuard)
@UsePipes(new ValidationPipe())
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() request: Request) {
    //_idTransform es un metodo que transformará el _id a un object necesario para gestionar las consultas
    return this.tasksService.create( createTaskDto, _idTransformRequest(request.user?._id, request));
  }

  @Get()
  findAll( @Req() request: Request ) {
    return this.tasksService.findAll(_idTransformRequest(request.user?._id, request));
  }

  @Get(':id')
  findOne( @Param('id') id: string, @Req() request: Request) {
    return this.tasksService.findOne(id, _idTransformRequest(request.user?._id, request));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto,  @Req() request: Request) {
    return this.tasksService.update(id, updateTaskDto, _idTransformRequest(request.user?._id, request));
  }

  @Delete(':id')
  remove(@Param('id') id: string,  @Req() request: Request) {
    return this.tasksService.remove(id, _idTransformRequest(request.user?._id, request));
  }
}
