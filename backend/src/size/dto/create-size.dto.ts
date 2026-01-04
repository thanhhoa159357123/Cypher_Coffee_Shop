import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreateSizeDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên size không được để trống' })
  name: string;

  @IsNumber()
  @IsNotEmpty({ message: 'Giá size không được để trống' })
  price: number;
}
