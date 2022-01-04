import { Bind, Body, Controller, Get, HttpStatus, Param, Post, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { pick } from 'src/utils/pick';
import { ImageDTO } from './dto/image.dto';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
    constructor(private imageService: ImagesService) {}

    @Post('upload')
    // @UsePipes(new JoiValidationPipe(create))
    @UseInterceptors(FileInterceptor('file'))
    @Bind(Res(), Body(new ValidationPipe), UploadedFile())
    async uploadFile(res, body: ImageDTO, file: Express.Multer.File) {
      console.log(body);
      const fileProperties = pick(file, ["originalname", "mimetype", "size", "buffer"])
      const fields = pick(body, ["name", "author"])
      const image = await this.imageService.create(fileProperties, fields);
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

    @Get(':id/download')
    @Bind(Res(), Param())
    async download(res, params) {
      const image = await this.imageService.findOne(params.id);
      res.set({
        'Content-Disposition': `attachment; filename="${image.originalname}"`,
      })
      res.status(HttpStatus.OK).send(image.buffer);
    }
}
