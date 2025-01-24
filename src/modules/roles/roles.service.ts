import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { ILike, Like, Repository } from 'typeorm';
import { CreatedResponse } from 'src/core/success.response';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) { }

  async create(createRoleDto: CreateRoleDto): Promise<{
    data: any;
    message: string;
  }> {

    const roleExist = await this.findByRoleName(createRoleDto.roleName);

    if (roleExist) {
      return {
        data: null,
        message: 'Tên quyền đã tồn tại!'
      }
    }

    const role = this.roleRepository.create(createRoleDto);
    await this.roleRepository.save(role)
    return {
      data: role,
      message: 'Thêm quyền thành công!'
    };
  }

  async findByRoleName(roleName: string) {
    return this.roleRepository.findOneBy({
      roleName: ILike(roleName)
    });
  }

  findAll() {
    return this.roleRepository.find();
  }

  findRoleById(id: number) {
    return this.roleRepository.findOneBy({
      id
    });
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
