import { Bind, Body, Controller, Get, HttpStatus, Param, Post, Res, UploadedFile, UseInterceptors, UsePipes } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
    constructor(private imageService: ImagesService) {}

    @Post('upload')
    // @UsePipes(new JoiValidationPipe(create))
    @UseInterceptors(FileInterceptor('file'))
    @Bind(Res(), UploadedFile())
    async uploadFile(res, file: Express.Multer.File) {
      console.log(file);
      const image = await this.imageService.create(file);
      res.status(HttpStatus.CREATED).send(image);
    }

    @Get()
    @Bind(Res())
    async findAll(res) {
      const images = await this.imageService.findAll();
      res.status(HttpStatus.OK).send(images);
    }

    @Get(':id')
    @Bind(Res(), Param())
    async findOne(res, params) {
      const image = await this.imageService.findOne(params.id);
      res.status(HttpStatus.OK).send(image);
    }
}
