import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException, ConflictException, HttpCode, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';


@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  findAll() {
    return this.activityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = this.activityService.findOne(id);
    if (!user) throw new NotFoundException ('Activity not found');
    return user
  }

  @Post()
  async create(@Body() body: CreateActivityDto) {
    try {
      return await this.activityService.create(body);
    }
    catch (error){
      if (error.code == 11000) {
        throw new ConflictException ('Activity already exist')
      }
      throw error
    };
  
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateActivityDto) {
    const user = await this.activityService.update(id, body);
    if (!user) throw new NotFoundException ('Activity not found');
    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const user = await this.activityService.remove(id);
    if (!user) throw new NotFoundException ('Activity not found');
    return user;
  }

  @Get('/export/json')
  async export(@Res() res: Response) {
    const activities = await this.activityService.findAll();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=activities.json');
    res.json(activities); 
  }


  @Post('/import/json')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        cb(null, `activities-${Date.now()}.json`);
      },
    }),
  }))
  async import(@UploadedFile() file: Express.Multer.File) {
    const filePath = file.path;
    const jsonData = fs.readFileSync(filePath, 'utf8');
    const activities = JSON.parse(jsonData);

    for (const activity of activities) {
      try {
        await this.activityService.create(activity);
      } catch (error) {
        if (error.code == 11000) {
          throw new ConflictException('Activity already exists');
        }
        throw error;
      }
    }
    return { message: 'Import successful' };
  }
  
}
