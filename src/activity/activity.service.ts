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

  async findOneUser(id: string): Promise<Activity> {
    return this.activityModel.findById(id).exec();
  }

  async create(createActivity: CreateActivityDto) {
    const newActivity = new this.activityModel(createActivity);
    return newActivity.save()
  }

  async update(id: string, updateActivityDto: UpdateActivityDto): Promise<Activity> {
    return this.activityModel.findByIdAndUpdate(id, updateActivityDto, { new: true }).exec();
  }

  remove(id: string) {
    return this.activityModel.findByIdAndDelete(id);
  }

  async removeAll(): Promise<{}> {
    return this.activityModel.deleteMany({});
}
}
