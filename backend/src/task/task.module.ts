import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity'
import { TaskResolver } from './task.resolver';
<<<<<<< HEAD

@Module({
  imports: [TypeOrmModule.forFeature([Task, User])],
  controllers: [],
  providers: [TaskService, TaskResolver],
=======
import { AuthCookiesService } from '../auth/scripts/auth-cookies.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task, User]),
  ],
  controllers: [],
  providers: [
    TaskService, 
    TaskResolver, 
    AuthCookiesService
    ],
>>>>>>> main
})
export class TaskModule {}
