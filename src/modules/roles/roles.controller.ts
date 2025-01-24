import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, NotFoundException, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto) {
    const role = await this.rolesService.create(createRoleDto);
    if (!role.data) {
      throw new BadRequestException(role.message);
    }
    return role;
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  async findRoleById(@Param('id') id: string) {
    const findRole = await this.rolesService.findRoleById(+id);
    if (!findRole) {
      throw new NotFoundException('Role not found!');
    }
    return findRole;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
