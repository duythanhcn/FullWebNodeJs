import { ApiProperty, ApiBody } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    example: 'Milk',
    maxLength: 255,
    minLength: 6,
  })
  @MinLength(6)
  categoryName: string;
  @ApiProperty({
    example: 'VinaMilk',
    maxLength: 255,
    minLength: 6,
  })
  @MinLength(6)
  description: string;
}
