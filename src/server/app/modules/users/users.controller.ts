import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiTags, ApiProperty, ApiPropertyOptional, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserInputDto } from './dto/user.dto';
import { BaseController } from '../../../vendors/base/base.controller';
@Controller('users')
@ApiTags('users')
export class UsersController extends BaseController {
  constructor(private userService: UsersService) {
    super();
  }
  @Get('/')
  @ApiOperation({
    description: 'des',
    summary: 'Get list users',
  })
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get('/:userId')
  @ApiOperation({
    description: 'des',
    summary: 'Get user by userId',
  })
  get(@Param('userId') id: number) {
    const user = this.userService.getById(id);
    return this.response(user);
  }
  @Post('/')
  @ApiOperation({
    description: 'des',
    summary: 'Create new user',
  })
  async create(@Body() createUserDto: CreateUserInputDto) {
    const user = await this.userService.create(createUserDto);
    return this.response(user);
  }
}
