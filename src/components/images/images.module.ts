import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImagesController } from './images.controller';
import { Image, ImageSchema } from './images.schema';
import { ImagesService } from './images.service';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService],
  imports: [MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }])],

})
export class ImagesModule {}
