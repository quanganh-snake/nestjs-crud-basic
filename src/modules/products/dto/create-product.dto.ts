import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from "class-validator";

export class CreateProductDto {
  @IsString({
    message: 'Tên sản phẩm phải là chuỗi',
  })
  @IsNotEmpty({
    message: 'Tên sản phẩm không được để trống',
  })
  @Length(5, 255, {
    message: 'Tên sản phẩm phải có độ dài từ 5 đến 255 ký tự',
  })
  name: string;

  @IsNotEmpty({
    message: 'Giá sản phẩm không được để trống',
  })
  @IsNumber({
    allowNaN: false,
    allowInfinity: false,
    maxDecimalPlaces: 2,
  }, {
    message: 'Giá sản phẩm phải là số',
  })
  price: number;

  @IsOptional()
  @IsBoolean()
  isDraft?: boolean;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}
