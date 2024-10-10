import { IsArray, IsOptional } from 'class-validator';
import { RegisterUserDto } from '../dto/register-user.dto'; // Ajusta la ruta según tu estructura de carpetas

export class UpdateActivityDto {
    @IsOptional()
    @IsArray()
    usersRegistered?: RegisterUserDto[];
}
