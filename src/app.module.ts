import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImagesModule } from './components/images/images.module';
import { UsersModule } from './components/users/users.module';

@Module({
  imports: [UsersModule, ImagesModule,
    MongooseModule.forRoot('mongodb://localhost/image-repo')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
