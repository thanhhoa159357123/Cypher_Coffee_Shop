import { Transform } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Tên sản phẩm không được để trống' })
  name: string;

  @Transform(({ value }) => parseFloat(value)) // ← THÊM DÒNG NÀY
  @IsNotEmpty({ message: 'Giá sản phẩm không được để trống' })
  price: number;

  @IsString()
  @IsNotEmpty({ message: 'Mô tả sản phẩm không được để trống' })
  description: string;

  @IsOptional()
  @IsString()
  imageUrl: string;

  @IsMongoId({ message: 'categoryId phải là MongoDB ID hợp lệ' })
  @IsNotEmpty({ message: 'categoryId không được để trống' })
  categoryId: string;
}
