import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schema/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor (@InjectModel(Users.name) private usermodel:Model<Users>){}

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
