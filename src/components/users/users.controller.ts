import { Bind, Body, Controller, Get, HttpStatus, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @Post()
    @Bind(Res(), Body(new ValidationPipe))
    async create(res, createUser: CreateUserDTO){
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
