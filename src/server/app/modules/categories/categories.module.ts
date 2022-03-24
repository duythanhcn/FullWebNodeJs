import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { LoggerModule } from '../../../common/logger/logger.module';
import { CategoryRepository } from './category.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService],
  imports: [TypeOrmModule.forFeature([CategoryRepository]), LoggerModule],
})
export class CategoriesModule {}
