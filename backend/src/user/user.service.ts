import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {} // Inject Prisma vào đây

  async register(createUserDto: CreateUserDto) {
    const { firstName, lastName, email, password } = createUserDto;

    const exist = await this.prisma.user.findUnique({
      where: { email },
    });
    if (exist) throw new ConflictException('Email này đã tồn tại');
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user)
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');

    // Kiểm tra nếu user không có password (đăng nhập bằng Google/Gmail)
    if (!user.password) {
      throw new UnauthorizedException(
        'Tài khoản này sử dụng đăng nhập qua Google',
      );
    }

    // Kiểm tra password có được gửi không
    if (!password) {
      throw new UnauthorizedException('Vui lòng nhập mật khẩu');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }

    // Trả về user không có password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
