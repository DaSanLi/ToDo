import { Connection } from 'mongoose';
export declare class AppService {
    private connection;
    getHello(): string;
    constructor(connection: Connection);
}
