import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ImageDocument = Image & Document;

@Schema()
export class Image {
  @Prop({required: true})
  originalname: string;

  @Prop({required: true})
  name: string;

  @Prop({required: false})
  author: string;

  @Prop({required: true})
  buffer: Buffer;

  @Prop({required: true})
  mimetype: string;

  @Prop({required: true})
  size: string;

}


export const ImageSchema = SchemaFactory.createForClass(Image);