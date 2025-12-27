import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  // Kết nối DB khi module khởi tạo
  async onModuleInit() {
    await this.$connect();
  }

  // Đóng kết nối khi app tắt (tránh rò rỉ bộ nhớ)
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
