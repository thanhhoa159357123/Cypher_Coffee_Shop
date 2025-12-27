import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class LoginUserDto {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Không được để trống email' })
  email: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  @ValidateIf((o) => !o.clerkId) // Bắt buộc nếu không có clerkId
  @IsString()
  @IsNotEmpty({ message: 'Không được để trống mật khẩu' })
  @MinLength(6, { message: 'Mật khẩu có ít nhất 6 kí tự' })
  password?: string;

  @IsOptional()
  @IsString()
  clerkId?: string;
}
