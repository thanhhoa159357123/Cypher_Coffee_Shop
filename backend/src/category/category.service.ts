import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import slugify from 'slugify';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const { name, parentId } = createCategoryDto;

    const slug = slugify(name, { lower: true, locale: 'vi' });

    const exist = await this.prisma.category.findUnique({ where: { slug } });
    if (exist) throw new ConflictException('Danh mục này đã tồn tại');

    return this.prisma.category.create({
      data: {
        name,
        slug,
        parentId: parentId || null,
      },
    });
  }

  async get() {
    return this.prisma.category.findMany({
      where: {
        OR: [
          { parentId: null },
          { parentId: { isSet: false } }, // Kiểm tra nếu field này không tồn tại (đặc thù MongoDB)
        ],
      },
      include: {
        children: true,
      },
    });
  }
}
