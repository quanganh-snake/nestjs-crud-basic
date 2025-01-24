import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import configuration from 'src/config/configuration';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: configuration().jwt.secret, // Khóa bí mật
      signOptions: { expiresIn: configuration().jwt.expiresIn }, // Thời gian sống của token
    })
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
