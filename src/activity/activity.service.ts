import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './schema/activity.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ActivityService {
  constructor (@InjectModel(Activity.name) private usermodel:Model<Activity>){}

  findAll() {
    return this.usermodel.find();
  }

  async findOne(id: string) {
    return this.usermodel.findById(id);
  }

  async create(createUser: CreateActivityDto) {
    const newUser = new this.usermodel(createUser);
    return newUser.save()
  }

  async update(id: string, update: UpdateActivityDto) {
    return this.usermodel.findByIdAndUpdate(id, update, {new:true});
  }

  remove(id: string) {
    return this.usermodel.findByIdAndDelete(id);
  }
}
