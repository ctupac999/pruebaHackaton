import { IsString, IsOptional, IsNotEmpty} from 'class-validator'

export class CreateActivityDto {
    @IsString()
    @IsNotEmpty()
    nameActivity:string;

    @IsOptional()
    usersRegistred ?: {
        userName:string;
        status:string};
}
