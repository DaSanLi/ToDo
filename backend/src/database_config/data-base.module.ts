import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { databaseProviders } from './config/database.providers';

@Module({
    imports: [ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true,
        load: [configuration],
    })],
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DataBaseModule {}
