import { ConflictException, Injectable } from '@nestjs/common';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SizeService {
  constructor(private prisma: PrismaService) {}

  async create(createSizeDto: CreateSizeDto) {
    const { name, price } = createSizeDto;

    const exist = await this.prisma.size.findUnique({
      where: { name: name.toLowerCase() },
    });
    if (exist) throw new ConflictException('Size này đã tồn tại');

    return this.prisma.size.create({
      data: {
        name,
        price,
      },
    });
  }

  async get() {
    return this.prisma.size.findMany();
  }
}
