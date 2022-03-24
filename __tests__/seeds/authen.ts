import { User } from '../../src/app/entities/user.entity';
import * as faker from 'faker';
export const userSample: Partial<User> = {
  fullname: faker.name.lastName(),
  accessToken: '',
  refreshToken: '',
  email: 'duythanhcn@gmail.com',
  gender: 'MALE',
  password: '1234567',
};
