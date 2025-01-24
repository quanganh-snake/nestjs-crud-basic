import { IsNotEmpty, MinLength, Validate } from "class-validator";
import { CustomTextUpperCase } from "src/customs/validations/CustomTextUppercase";

export class CreateRoleDto {
  @IsNotEmpty({
    message: 'Tên quyền không được để trống',
  })
  @MinLength(1, {
    message: 'Độ dài tối thiểu của tên quyền là 1',
  })
  @Validate(CustomTextUpperCase, {
    message: 'Tên quyền phải viết hoa'
  })
  roleName: string;
}
