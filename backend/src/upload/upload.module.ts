import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CloudinaryProvider } from 'src/config/cloudinary.config';

@Module({
  providers: [CloudinaryProvider, UploadService],
  exports: [UploadService],
})
export class UploadModule {}
