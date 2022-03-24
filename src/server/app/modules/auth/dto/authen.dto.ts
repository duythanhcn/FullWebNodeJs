import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    example: 'duythanhcn@gmail.com',
  })
  email: string;
  @ApiProperty({
    example: '$2a$12$T9jzl3YIJ7NXWzWx4NMl6esUwhHXT.Ta31pXqGcESvDjD7TZyf8vy',
  })
  password: string;
}
