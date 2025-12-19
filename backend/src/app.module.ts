import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DataBaseModule } from './database_config/database.module';

@Module({
  imports: [DataBaseModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
