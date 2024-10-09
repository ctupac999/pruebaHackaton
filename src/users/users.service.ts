import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { Mode } from 'fs';

@Injectable()
export class UsersService {
  constructor (@InjectModel(User.name) private usermodel:Model<User>){}

  findAll() {
    return this.usermodel.find();
  }

  async findOne(id: string) {
    return this.usermodel.findById(id);
  }

  async create(createUser: CreateUserDto) {
    const newUser = new this.usermodel(createUser);
    return newUser.save()
  }

  async update(id: string, update: UpdateUserDto) {
    return this.usermodel.findByIdAndUpdate(id, update, {new:true});
  }

  remove(id: string) {
    return this.usermodel.findByIdAndDelete(id);
  }
}
