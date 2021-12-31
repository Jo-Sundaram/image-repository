import { Bind, Body, Controller, Get, HttpStatus, Post, Res, UsePipes } from '@nestjs/common';
import { create } from 'src/validations/users.validations';
import { JoiValidationPipe } from 'src/validations/validator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post()
    @UsePipes(new JoiValidationPipe(create))
    @Bind(Res(), Body())
    async create(res, createUser) {
      const user = await this.userService.create(createUser);
      res.status(HttpStatus.CREATED).send(user);
    }

    @Get()
    @Bind(Res())
    async findAll(res) {
      const users = await this.userService.findAll();
      res.status(HttpStatus.OK).send(users);
    }
}
