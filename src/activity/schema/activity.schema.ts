import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class UsersRegistered {
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
  usersRegistered: UsersRegistered[];
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
