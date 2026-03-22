import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAllUsers(): Promise<User[]>;
    findOneUser(id: string): Promise<User>;
    updateUser(id: string, body: UpdateUserDto): Promise<string>;
    softDeleteUSer(id: string): Promise<string>;
    cancelSoftDelete(id: string): Promise<string>;
    hardDeleteUser(id: string): Promise<string>;
}
