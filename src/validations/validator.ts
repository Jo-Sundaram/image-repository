import { Injectable, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe {
  schema: ObjectSchema<any>;
  constructor(schema: ObjectSchema) {
    this.schema = schema;
  }

  transform(value) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException(error.details);
    }
    return value;
  }
}
