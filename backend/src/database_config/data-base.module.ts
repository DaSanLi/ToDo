import { Module } from '@nestjs/common';
import configuration from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
            load: [configuration],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('database.host'),
                port: configService.get<number>('database.port'),
                username: configService.get('database.username'),
                password: configService.get('database.password'),
                database: configService.get('database.db_name'),
                entities: ['dist/**/*.entity.js'],
                migrations: ['src/database/migrations/*.ts'], // Carpeta donde se generarán tus migrations
                synchronize: true,
            }),
            inject: [ConfigService],
        })
    ],
    providers: [],
    exports: [],
})
export class DataBaseModule { }
