import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Res, HttpStatus } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Res() res: Response,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({maxSize: 1024 * 1024 * 4}),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)'})
        ]
      }),
    ) file: Express.Multer.File){
    const data = await  this.filesService.uploadFile(file);

    res.status(HttpStatus.CREATED).json({ 
      data: data,
      message: 'Archivo guardado correctamente',
      status: 201
    })
  }

  @Delete('delete')
  async removeImage(
    @Res() res: Response,
    @Body() body) {
    const data = await  this.filesService.deleteImage(body.url);
    res.status(HttpStatus.OK).json({ 
      data: data,
      message: 'Archivo eliminado correctamente',
      status: 200
    })
  } 



  
  
}