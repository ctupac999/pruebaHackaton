import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps:true
})

export class Users {
    @Prop({
        required:true,
    })
    name: string;
    @Prop({
        required:true,
    })
    lastName:string;
    @Prop({
        unique:true,
        required:true,
    })
    email:string;
    @Prop({
        required:false,
    })
    edad:number;}

    export const UserSchema = SchemaFactory.createForClass(Users)