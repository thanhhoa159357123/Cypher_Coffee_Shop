import { ConflictException, Injectable } from '@nestjs/common';
import { CreateToppingDto } from './dto/create-topping.dto';
import { UpdateToppingDto } from './dto/update-topping.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ToppingService {
  constructor(private prisma: PrismaService) {}

  async create(createToppingDto: CreateToppingDto) {
    const { name, price } = createToppingDto;

    const exist = await this.prisma.topping.findUnique({
      where: { name: name.toLowerCase() },
    });
    if (exist) throw new ConflictException('Topping này đã tồn tại');

    return this.prisma.topping.create({
      data: {
        name,
        price,
      },
    });
  }

  async get() {
    return this.prisma.topping.findMany();
  }
}
