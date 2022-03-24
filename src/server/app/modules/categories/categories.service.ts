import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { Category } from '../../entities/category.entity';

/**
 * Why need repository
 * https://stackoverflow.com/questions/52030009/nestjs-with-typeorm-when-using-custom-repository-is-a-service-needed-anymore
 */
@Injectable()
export class CategoriesService {
  constructor(
    private logger: Logger,
    @InjectRepository(Category)
    private categoryRepository: CategoryRepository
  ) {}

  async getAll() {
    const cates = await this.categoryRepository.find();
    return cates;
  }

  async get(id: number) {
    const cate = await this.categoryRepository.findOne({
      where: {
        categoryId: id,
      },
    });
    return cate;
  }
  async create(input: any) {
    return await this.categoryRepository.insert(input);
  }
}
