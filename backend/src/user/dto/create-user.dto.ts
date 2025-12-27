import {
  IsNotEmpty,
  MinLength,
  IsString,
  IsEmail,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Không được để trống tên' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'Không được để trống họ' })
  lastName: string;

  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Không được để trống email' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Không được để trống mật khẩu' })
  @MinLength(6, { message: 'Mật khẩu có ít nhất 6 kí tự' })
  password: string;

  @IsOptional()
  phoneNumber: string;
}
