declare const _default: () => {
    database: {
        type: "postgres";
        port: number;
        host: string | undefined;
        username: string | undefined;
        password: string | undefined;
        database: string | undefined;
        entities: string[];
        migrations: string[];
        synchronize: boolean;
    };
};
export default _default;
