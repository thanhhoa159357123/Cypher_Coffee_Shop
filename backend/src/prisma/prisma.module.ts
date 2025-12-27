import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Để Service này dùng được ở mọi nơi mà không cần import lại nhiều lần
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
