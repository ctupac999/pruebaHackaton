import { IsString, IsOptional, IsNotEmpty, IsNumber} from 'class-validator'

export class CreateActivityDto {
    @IsString()
    @IsNotEmpty()
    name:string;

    @IsString()
    @IsNotEmpty()
    description:string;

    @IsNumber()
    @IsNotEmpty()
    maxCapacity:number;

    @IsOptional()
    usersRegistered ?: {
        userName:string;
        status:string};
}
