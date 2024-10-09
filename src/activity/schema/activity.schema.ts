import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class UsersRegistered {
  @Prop({ required: true })
  userName: string;

  @Prop({ required: true })
  status: string;
}

@Schema({ timestamps: true })
export class Activity extends Document {
  @Prop({ unique: true, required: true })
  nameActivity: string;

  @Prop({ type: [UsersRegistered], required: false })
  usersRegistred: UsersRegistered[];
}

export const ActivitySchema = Schema
