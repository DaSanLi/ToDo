export default () => ({
    database: {
        schema: 'public',
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        db_name: process.env.DB_NAME,
    }
});