import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps:true
})

export class Activity {
    @Prop({
        unique:true,
        required:true,
    })
    nameActivity:string;
    @Prop({
        required:false,
    })
    usersRegistred: {
        userName:string;
        status:string};
}

export const ActivitySchema = SchemaFactory.createForClass(Activity)
