import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<User>);
    create(createUserDto: CreateUserDto): Promise<object>;
    findAll(): Promise<User[]>;
    findOne(_id: string): Promise<User>;
    update(updateUserDto: UpdateUserDto, _id: Object): Promise<object>;
    remove(_id: string): Promise<object>;
}
