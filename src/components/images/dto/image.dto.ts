import { IsString } from 'class-validator';

export class ImageDTO {
  @IsString()
  name: string;
}