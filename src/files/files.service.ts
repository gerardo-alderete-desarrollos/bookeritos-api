import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';

const streamifier = require('streamifier');

@Injectable()
export class FilesService {

  uploadFile(file: Express.Multer.File ): Promise<CloudinaryResponse> {
    
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      console.log('file', file)
      const options: UploadApiOptions ={
        folder: 'libros',
        filename_override: file.originalname,
        use_filename: true
      }
      const uploadStream = cloudinary.uploader.upload_stream(
        options,
        (error, result) => {
          if(error) return reject(error);
          resolve(result);
        }, 
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    })
  }

  async deleteImage(url) {

    const arrayUrl = url.split('/');
    const folderName = arrayUrl[arrayUrl.length -2];
    const bookName = arrayUrl[arrayUrl.length -1].split('.')[0];
    const publicIdFormat = `${folderName}/${bookName}`
    console.log('publicFormat', publicIdFormat);
    const publicId = publicIdFormat;
    
    return cloudinary.uploader.destroy(publicId);
  }
   
}