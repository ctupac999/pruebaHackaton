import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException, ConflictException, HttpCode, Res, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import * as path from 'path';


@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  findAll() {
    return this.activityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const activity = await this.activityService.findOne(id); 
    if (!activity) throw new NotFoundException('Activity not found');
    return activity;
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
    const activity = await this.activityService.update(id, body);
    if (!activity) throw new NotFoundException ('Activity not found');
    return activity;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const activity = await this.activityService.remove(id);
    if (!activity) throw new NotFoundException ('Activity not found');
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
