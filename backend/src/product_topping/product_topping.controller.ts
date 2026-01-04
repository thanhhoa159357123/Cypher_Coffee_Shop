import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductToppingService } from './product_topping.service';
import { CreateProductToppingDto } from './dto/create-product_topping.dto';
import { UpdateProductToppingDto } from './dto/update-product_topping.dto';

@Controller('product-toppings')
export class ProductToppingController {
  constructor(private readonly productToppingService: ProductToppingService) {}

  @Post()
  async create(@Body() createProductToppingDto: CreateProductToppingDto) {
    return await this.productToppingService.create(createProductToppingDto);
  }

  @Get()
  async get() {
    return await this.productToppingService.get();
  }
}
