import { ConflictException, Injectable } from '@nestjs/common';
import { CreateProductToppingDto } from './dto/create-product_topping.dto';
import { UpdateProductToppingDto } from './dto/update-product_topping.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductToppingService {
  constructor(private prisma: PrismaService) {}

  async create(createProductToppingDto: CreateProductToppingDto) {
    const { productId, toppingId } = createProductToppingDto;

    // Kiểm tra product có tồn tại không
    const existProduct = await this.prisma.product.findUnique({
      where: { id: productId },
    });
    if (!existProduct) throw new ConflictException('Sản phẩm không tồn tại');

    // Kiểm tra size có tồn tại không
    const existTopping = await this.prisma.topping.findUnique({
      where: { id: toppingId },
    });
    if (!existTopping) throw new ConflictException('Topping không tồn tại');

    // Kiểm tra ProductSize đã tồn tại chưa
    const existProductTopping = await this.prisma.productTopping.findFirst({
      where: { productId, toppingId },
    });
    if (existProductTopping)
      throw new ConflictException('Sản phẩm này đã có topping này rồi');

    return this.prisma.productTopping.create({
      data: {
        productId,
        toppingId,
      },
    });
  }

  async get() {
    return await this.prisma.productTopping.findMany({
      include: { product: true, topping: true }, // Include full object
    });
  }
}
