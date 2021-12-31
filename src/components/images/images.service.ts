import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image, ImageDocument } from './images.schema';


@Injectable()
export class ImagesService {
    constructor(@InjectModel(Image.name) private imageModel: Model<ImageDocument>) {}

    async create(image): Promise<Image> {
        const createdImage = new this.imageModel(image)
        return createdImage.save();
      }

    async findAll(): Promise<Image[]> {
        return this.imageModel.find().exec();
    }

    async findOne(id): Promise<Image> {
        return this.imageModel.findOne({_id: id}).exec();
    }
}
