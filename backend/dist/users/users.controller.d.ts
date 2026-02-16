import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    hardDeleteUser(id: string): Promise<string>;
}
