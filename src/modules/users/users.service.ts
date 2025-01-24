import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { hashText } from 'src/utils/hash.util';
import { randomBytes } from 'crypto';
import { createTokenPair } from 'src/utils/token.util';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {

    const checkEmailExist = await this.usersRepository.findOne({
      where: { email: createUserDto.email }
    });

    if (checkEmailExist) {
      return {
        success: false,
        error: true,
        message: 'Email này đã được đăng ký!',
        data: {}
      };
    }

    createUserDto.password = await hashText(createUserDto.password);
    const user = this.usersRepository.create(createUserDto);

    if (user) {
      const privateKey = randomBytes(64).toString("hex");
      const publicKey = randomBytes(64).toString("hex");

      const keyTokens = await createTokenPair({
        privateKey, publicKey, payload: {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      })

      if (!keyTokens) {
        return {
          code: 400,
          message: "keyTokens error",
        };
      }

      await this.usersRepository.save({
        ...user,
      })

      const { password, ...userWithoutPassword } = user;

      return {
        success: true,
        error: false,
        message: 'Đăng ký tài khoản thành công!',
        user: userWithoutPassword,
        token: keyTokens
      };
    }


  }

  async findAll() {
    const [users, totalItems] = await this.usersRepository.findAndCount();
    return {
      users,
      totalItems,
    };
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({
      id
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const findUser = await this.usersRepository.findOneBy({
      id
    });

    if (!findUser) {
      return null
    }
    await this.usersRepository.update(id, updateUserDto);
    const user = await this.usersRepository.findOneBy({
      id
    });
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async remove(id: number) {
    const findUser = await this.usersRepository.findOneBy({ id });
    const { password, ...userWithoutPassword } = findUser;
    const { raw, affected } = await this.usersRepository.delete(id);
    return {
      raw,
      affected,
      user: userWithoutPassword,
    }
  }
}
