import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateProductToppingDto {
  @IsMongoId({ message: 'productId phải là MongoDB ID hợp lệ' })
  @IsNotEmpty({ message: 'productId không được để trống' })
  productId: string;

  @IsMongoId({ message: 'toppingId phải là MongoDB ID hợp lệ' })
  @IsNotEmpty({ message: 'toppingId không được để trống' })
  toppingId: string;
}
