import { DataSource } from "typeorm"
import 'dotenv/config'; //con esto podemos leer env 
import { User } from "src/user/entities/user.entity"

export const dataSource = new DataSource({ 
    type: 'postgres', 
    host: process.env.DB_HOST, 
    port: Number(process.env.DB_PORT), 
    username: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME, 
    entities: ['dist/**/*.entity.js'], 
    migrations: ['src/database/migrations/*.ts'], // Carpeta donde se generarán tus migrations
    synchronize: false, 
})

