import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema({
    timestamps: true,
})
export class Users extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    lastname: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ required: false })
    edad: number;
}

export const UserSchema = SchemaFactory.createForClass(Users);
