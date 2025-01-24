import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    if (!user) throw new BadRequestException('Create user failed!');
    return user
  }

  @Get()
  async findAll() {
    const dataUsers = await this.usersService.findAll();
    return {
      data: dataUsers,
      message: 'Get all users successfully!',
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const findUser = await this.usersService.findOne(+id);
    if (!findUser) throw new NotFoundException('User not found!');
    return findUser;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const { affected, user } = await this.usersService.remove(+id);
    if (affected === 0) throw new NotFoundException('User not found!');
    return {
      user,
      message: 'Delete user successfully!',
    }
  }
}
