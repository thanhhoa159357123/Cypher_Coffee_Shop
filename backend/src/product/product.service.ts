import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import slugify from 'slugify';

// 1. Định nghĩa Select
const productSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  price: true,
  imageUrl: true, // Check lại trong schema của cậu là image hay imageUrl nhé
  category: {
    select: { id: true, name: true },
  },
  productSizes: {
    select: {
      size: { select: { name: true, price: true } },
    },
  },
  productToppings: {
    select: {
      topping: { select: { name: true, price: true } },
    },
  },
} satisfies Prisma.ProductSelect;

// 2. Tạo Type
type ProductWithRelations = Prisma.ProductGetPayload<{
  select: typeof productSelect;
}>;

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const { name, description, price, imageUrl, categoryId } = createProductDto;

    const slug = slugify(name, { lower: true, locale: 'vi' });
    const exist = await this.prisma.product.findUnique({ where: { slug } });
    if (exist) throw new ConflictException('Sản phẩm này đã tồn tại');

    return this.prisma.product.create({
      data: {
        name,
        slug,
        description,
        price,
        imageUrl,
        categoryId,
      },
    });
  }

  async get() {
    const products = await this.prisma.product.findMany({
      select: productSelect,
    });

    // 4. Map & Return
    return products.map((product: ProductWithRelations) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.imageUrl,
      categoryName: product.category?.name, // Lấy tên category cho gọn

      // Map mảng lồng nhau ra ngoài cho đẹp
      sizes: product.productSizes.map((ps) => ps.size),
      toppings: product.productToppings.map((pt) => pt.topping),
    }));
  }
}
