import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadService {
  async uploadImage(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { folder: 'cypher_shop/products' },
        (error, result) => {
          // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
          if (error) reject(error);
          else resolve(result?.secure_url || '');
        },
      );
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      upload.end(file.buffer);
    });
  }
}
