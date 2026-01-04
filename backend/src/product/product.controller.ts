import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { UploadService } from 'src/upload/upload.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('imageUrl'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let imageUrl = createProductDto.imageUrl;
    if (file) {
      imageUrl = await this.uploadService.uploadImage(file);
    }
    return await this.productService.create({ ...createProductDto, imageUrl });
  }

  @Get()
  async get() {
    return await this.productService.get();
  }
}
