import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity'
import { TaskResolver } from './task.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User])],
  controllers: [],
  providers: [TaskService, TaskResolver],
})
export class TaskModule {}
