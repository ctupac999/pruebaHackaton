import { Controller, Get, Post, Body, Param, Delete, NotFoundException, Put, HttpCode, ConflictException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = this.usersService.findOne(id);
    if (!user) throw new NotFoundException ('User not found');
    return user
  }

  @Post()
  async create(@Body() body: CreateUserDto) {
    try {
      return await this.usersService.create(body);
    }
    catch (error){
      if (error.code == 11000) {
        throw new ConflictException ('User already exist')
      }
      throw error
    };
  
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    const user = await this.usersService.update(id, body);
    if (!user) throw new NotFoundException ('User not found');
    return user;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const user = await this.usersService.remove(id);
    if (!user) throw new NotFoundException ('User not found');
    return user;
  }
}
