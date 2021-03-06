import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './users.schema'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
    

    async create(user): Promise<User> {
        const createdUser = new this.userModel(user)
        return createdUser.save();
      }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

}
