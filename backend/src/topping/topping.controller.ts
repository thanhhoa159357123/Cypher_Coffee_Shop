import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ToppingService } from './topping.service';
import { CreateToppingDto } from './dto/create-topping.dto';
import { UpdateToppingDto } from './dto/update-topping.dto';

@Controller('toppings')
export class ToppingController {
  constructor(private readonly toppingService: ToppingService) {}

  @Post()
  async create(@Body() createToppingDto: CreateToppingDto) {
    return this.toppingService.create(createToppingDto);
  }

  @Get()
  async get() {
    return this.toppingService.get();
  }
}
