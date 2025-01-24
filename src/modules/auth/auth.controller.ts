import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UsersService } from 'src/modules/users/users.service';
import { LoginDto } from 'src/modules/auth/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly userService: UsersService
  ) { }

  @Post('/register')
  register(@Body() createAuthDto: CreateUserDto) {
    return this.userService.create(createAuthDto);
  }

  @Post('/login')
  login(@Body() dataLogin: LoginDto) {
    const { email, password } = dataLogin;
    const findUser = this.authService.validateUser(email, password);
    if (!findUser) {
      return {
        success: false,
        message: 'Email hoặc mật khẩu không đúng!',
        data: {}
      }
    }
    return findUser;
  }
}
