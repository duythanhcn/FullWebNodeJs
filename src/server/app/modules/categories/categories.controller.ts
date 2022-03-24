import { Controller, Get, Param, Post, HttpCode, Body, UsePipes } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody } from '@nestjs/swagger';
import { BaseController } from '../../../vendors/base/base.controller';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/categories.dto';
@Controller('categories')
@ApiTags('categories')
@ApiBearerAuth()
// @UseFilters(AllExceptionsFilter)
export class CategoriesController extends BaseController {
  constructor(private categoriesService: CategoriesService) {
    super();
  }
  @Get('/')
  @ApiTags('categories')
  @ApiOperation({
    summary: 'Get list categories',
  })
  @HttpCode(200)
  async findAll() {
    const cates = await this.categoriesService.getAll();
    return this.response(cates);
  }

  @Get('/:cateId')
  @ApiOperation({
    summary: 'Get a category',
  })
  async get(@Param('cateId') id: number) {
    const cate = await this.categoriesService.get(id);
    return this.response(cate);
  }

  @ApiOperation({
    summary: 'Add new a Category',
  })
  @Post('/')
  async create(@Body() body: CreateCategoryDto) {
    await this.categoriesService.create(body);
    return this.response(true);
  }
}
