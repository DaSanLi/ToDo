"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    database: {
        type: 'postgres',
        port: Number(process.env.DB_PORT),
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: ['dist/**/*.entity.js'],
        migrations: ['dist/database-connection/database/migrations/*.js'],
        synchronize: false,
    }
});
//# sourceMappingURL=configuration.js.map