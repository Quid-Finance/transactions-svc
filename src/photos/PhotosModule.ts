import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Photo } from './models/Photo';
import { PhotosService } from './domain/PhotosService';

@Module({
  imports: [SequelizeModule.forFeature([Photo])],
  providers: [PhotosService],
})
export class PhotosModule { }
