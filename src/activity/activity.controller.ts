import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException, ConflictException, HttpCode, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Response } from 'express';
import { RegisterUserDto } from './dto/register-user.dto';
import { UsersRegistered } from './schema/activity.schema';
import * as fs from 'fs';
import * as path from 'path';


@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) { }

  @Get()
  findAll() {
    return this.activityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const activity = await this.activityService.findOneUser(id);
    if (!activity) throw new NotFoundException('Activity not found');
    return activity;
  }

  @Get('/export/json')
  async export(@Res() res: Response) {
    try {
      const activities = await this.activityService.findAll();
      console.log(activities);

      if (!activities || activities.length === 0) {
        return res.status(204).send();
      }

      const filePath = path.join(__dirname, '../../exports/activities.json');

      fs.writeFileSync(filePath, JSON.stringify(activities, null, 2));

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', 'attachment; filename=activities.json');
      return res.json(activities);
    } catch (error) {
      console.error('Error al exportar actividades:', error);
      return res.status(500).send('Error al exportar actividades');
    }
  }

  @Post()
  async create(@Body() body: CreateActivityDto) {
    try {
      return await this.activityService.create(body);
    }
    catch (error) {
      if (error.code == 11000) {
        throw new ConflictException('Activity already exist')
      }
      throw error
    };

  }

  @Post('/import/json')
  async import() {
    const uploadDir = path.join(__dirname, '../../uploads');
    const files = fs.readdirSync(uploadDir);

    const jsonFiles = files.filter(file => file.endsWith('.json'));

    if (jsonFiles.length === 0) {
      return { message: 'No JSON files found in the upload directory.' };
    }

    for (const file of jsonFiles) {
      const filePath = path.join(uploadDir, file);
      const jsonData = fs.readFileSync(filePath, 'utf8');
      const activities = JSON.parse(jsonData);

      for (const activity of activities) {
        try {
          await this.activityService.create(activity);
        } catch (error) {
          if (error.code === 11000) {
            console.warn(`Conflict: Activity "${activity.nameActivity}" already exists.`);
          } else {
            console.error('Error importing activity:', error);
          }
        }
      }
    }

    return { message: 'Import successful' };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateActivityDto) {
    const activity = await this.activityService.update(id, body);
    if (!activity) throw new NotFoundException('Activity not found');
    return activity;
  }

  @Put(':id/register')
  async registerUser(@Param('id') id: string, @Body() body: RegisterUserDto) {
    const activity = await this.activityService.findOneUser(id);

    if (!activity) {
      throw new NotFoundException('Activity not found');
    }

    if (activity.maxCapacity === 0) {
      throw new ConflictException('Cannot register users. Maximum capacity is 0.');
    }

    if (activity.maxCapacity && activity.usersRegistered.length >= activity.maxCapacity) {
      throw new ConflictException('Max capacity reached. Cannot register more users.');
    }

    const registeredUser: UsersRegistered = { userName: body.userName, status: body.status };
    activity.usersRegistered.push(registeredUser);

    const updateActivityDto: UpdateActivityDto = {
      usersRegistered: activity.usersRegistered
    };

    return await this.activityService.update(id, updateActivityDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const activity = await this.activityService.remove(id);
    if (!activity) throw new NotFoundException('Activity not found');
    return activity;
  }

  @Delete()
  @HttpCode(204)
  async removeAll() {
    await this.activityService.removeAll();
    return;
  }
}


