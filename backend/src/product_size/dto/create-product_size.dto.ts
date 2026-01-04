import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateProductSizeDto {
  @IsMongoId({ message: 'productId phải là MongoDB ID hợp lệ' })
  @IsNotEmpty({ message: 'productId không được để trống' })
  productId: string;

  @IsMongoId({ message: 'sizeId phải là MongoDB ID hợp lệ' })
  @IsNotEmpty({ message: 'sizeId không được để trống' })
  sizeId: string;
}
