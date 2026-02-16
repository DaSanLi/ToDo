import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

@InputType()
export class LoginDto {

    @Field()
    @IsString()
    @MinLength(5)
    @MaxLength(50)
    @IsNotEmpty()
    email!: string;


    @Field()
    @MinLength(1)
    @IsNotEmpty()
    @IsString()
    password!: string;


}
