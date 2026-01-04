import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductSizeService } from './product_size.service';
import { CreateProductSizeDto } from './dto/create-product_size.dto';
import { UpdateProductSizeDto } from './dto/update-product_size.dto';

@Controller('product-sizes')
export class ProductSizeController {
  constructor(private readonly productSizeService: ProductSizeService) {}

  @Post()
  async create(@Body() createProductSizeDto: CreateProductSizeDto) {
    return await this.productSizeService.create(createProductSizeDto);
  }

  @Get()
  async get() {
    return await this.productSizeService.get();
  }
}
