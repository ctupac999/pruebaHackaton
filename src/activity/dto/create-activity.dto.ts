import { IsString, IsOptional, IsNotEmpty, IsNumber} from 'class-validator'

export class CreateActivityDto {
    @IsString()
    @IsNotEmpty()
    nameActivity: string;

    @IsString()
    description ?: string;

    @IsNumber()
    maxCapacity ?: number;

    @IsOptional()
    usersRegistered ?: {
        userName?:string;
        status?:string};
}
