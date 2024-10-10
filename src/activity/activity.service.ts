import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './schema/activity.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ActivityService {
  constructor (@InjectModel(Activity.name) private activityModel:Model<Activity>){}

  findAll() {
    return this.activityModel.find();
  }

  async findOne(id: string) {
    return this.activityModel.findById(id);
  }

  async create(createActivity: CreateActivityDto) {
    const newActivity = new this.activityModel(createActivity);
    return newActivity.save()
  }

  async update(id: string, update: UpdateActivityDto) {
    return this.activityModel.findByIdAndUpdate(id, update, {new:true});
  }

  remove(id: string) {
    return this.activityModel.findByIdAndDelete(id);
  }
}
