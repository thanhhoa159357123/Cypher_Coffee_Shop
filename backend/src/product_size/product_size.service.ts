import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductSizeDto } from './dto/create-product_size.dto';
import { UpdateProductSizeDto } from './dto/update-product_size.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductSizeService {
  constructor(private prisma: PrismaService) {}

  async create(createProductSizeDto: CreateProductSizeDto) {
    const { productId, sizeId } = createProductSizeDto;

    // Kiểm tra product có tồn tại không
    const existProduct = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!existProduct) throw new ConflictException('Sản phẩm không tồn tại');

    // Kiểm tra size có tồn tại không
    const existSize = await this.prisma.size.findUnique({
      where: { id: sizeId },
    });
    if (!existSize) throw new ConflictException('Size không tồn tại');

    // Kiểm tra ProductSize đã tồn tại chưa
    const existProductSize = await this.prisma.productSize.findFirst({
      where: { productId, sizeId },
    });
    if (existProductSize)
      throw new ConflictException('Sản phẩm này đã có size này rồi');

    return this.prisma.productSize.create({
      data: {
        productId,
        sizeId,
      },
    });
  }

  async get() {
    return await this.prisma.productSize.findMany({
      include: { product: true, size: true }, // Include full object
    });
  }
}
