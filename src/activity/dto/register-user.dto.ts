import { IsString } from 'class-validator';

export class RegisterUserDto {
    @IsString()
    userName: string;

    @IsString()
    status: string;
}
