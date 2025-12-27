import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Thêm dòng này vào
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Tự động loại bỏ các field không được định nghĩa trong DTO
      forbidNonWhitelisted: true,
      transform: true, // Tự động convert kiểu dữ liệu (vd: string sang number)
    }),
  );

  await app.listen(3000);
}
bootstrap().catch((err) => {
  console.error('Error during application bootstrap', err);
});
