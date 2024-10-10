import { IsString, IsNumber, IsOptional, IsNotEmpty} from 'class-validator'

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    lastname:string;
    
    @IsString()
    @IsNotEmpty()
    email:string;
    
    @IsNumber()
    @IsOptional()
    edad ?:number;
}
