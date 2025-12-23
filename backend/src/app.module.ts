import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DataBaseModule } from './database_config/database.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
<<<<<<< HEAD
    DataBaseModule, 
    UserModule
=======
    DataBaseModule,
    UserModule, 
    AuthModule
>>>>>>> dev
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
