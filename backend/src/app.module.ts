import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { PrismaModule } from './prisma/prisma.module';
import { SizeModule } from './size/size.module';
import { ProductModule } from './product/product.module';
import { ProductSizeModule } from './product_size/product_size.module';
import { ToppingModule } from './topping/topping.module';
import { ProductToppingModule } from './product_topping/product_topping.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    UploadModule,
    PrismaModule,
    UserModule,
    CategoryModule,
    SizeModule,
    ProductModule,
    ProductSizeModule,
    ToppingModule,
    ProductToppingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
