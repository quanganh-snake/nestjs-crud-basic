import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { Role } from "src/entities/role.entity";

export class CreateUserDto {
  @IsNotEmpty({
    message: 'Tên không được để trống'
  })
  @MinLength(6, {
    message: 'Tên phải có ít nhất 6 ký tự'
  })
  name: string;

  @IsNotEmpty({
    message: 'Email không được để trống'
  })
  @IsEmail({}, {
    message: 'Email không đúng định dạng'
  })
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  isActive: boolean;

  @IsOptional()
  roles: Role[]
}
