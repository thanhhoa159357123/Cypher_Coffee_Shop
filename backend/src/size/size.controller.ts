import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SizeService } from './size.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';

@Controller('sizes')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Post()
  async create(@Body() createSizeDto: CreateSizeDto) {
    return await this.sizeService.create(createSizeDto);
  }

  @Get()
  async get() {
    return this.sizeService.get();
  }
}
