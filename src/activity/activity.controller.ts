import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException, ConflictException, HttpCode } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

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
    if (!user) throw new NotFoundException ('User not found');
    return user
  }

  @Post()
  async create(@Body() body: CreateActivityDto) {
    try {
      return await this.activityService.create(body);
    }
    catch (error){
      if (error.code == 11000) {
        throw new ConflictException ('User already exist')
      }
      throw error
    };
  
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateActivityDto) {
    const user = await this.activityService.update(id, body);
    if (!user) throw new NotFoundException ('User not found');
    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const user = await this.activityService.remove(id);
    if (!user) throw new NotFoundException ('User not found');
    return user;
  }
}
