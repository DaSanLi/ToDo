import { Module } from '@nestjs/common';
import { DatabaseModule } from './database-connection/database.module';
import { GraphQlModule } from './graph-ql/graph-ql.module';
import { AuthModule } from './auth/auth.module'; 
import { UsersModule } from './users/users.module';
import { TaskModule } from './task/task.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    DatabaseModule, 
    GraphQlModule,
    UsersModule,
    AuthModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
