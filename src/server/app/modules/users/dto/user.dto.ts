import { Min, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

/**
 * @description When you want to validate input of a API (Query or Mutation)
 * you only need to extend schema from graphql.schema.
 *
 * @author ThanhLD
 * @export
 * @class CreateUserInputDto
 * @extends {CreateUserInput}
 */
export class CreateUserInputDto {
  @IsEmail()
  @ApiProperty({
    example: 'duythanhcn@gmail.com',
  })
  email: string;
  @ApiProperty({
    example: 'Le Duy Thanh',
  })
  fullname: string;
  @ApiProperty({
    example: '1234567Pwd',
  })
  password: string;
  @ApiProperty()
  gender: string;
}
