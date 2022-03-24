import * as bcrypt from 'bcrypt';
import { createConnection, Connection } from 'typeorm';
import { User } from '../../src/app/entities/user.entity';
import { PayloadJwt, axiosWithAuth } from '../utils/authRequest';
import { AxiosResponse } from 'axios';
import { getBaseUrl } from '../utils/common';
const baseUrl = getBaseUrl();
// tslint:disable-next-line
require('dotenv').config();
/**
 * Sample data
 */
const userSample = {
  userId: 1,
  fullname: 'NQT',
  accessToken: '',
  refreshToken: '',
  email: 'duythanhcn@gmail.com',
  gender: 'MALE',
  password: '1234567',
};

jest.setTimeout(50000);
describe('getUserInformation', () => {
  let cnn: Connection;
  /**
   * Example. Your token maked by payload consist of (email & userId)
   * So you need to mock your token by pass into object PayloadJwt
   */
  const payloadJwt: PayloadJwt = {
    email: userSample.email,
    userId: userSample.userId,
  };

  /**
   * For some cases, You need to prepare data in db before run your test case.
   * You can put seed data in function `beforeAll` or `beforeEach`
   *
   */
  beforeAll(async () => {
    cnn = await createConnection();

    await cnn.createQueryRunner().clearTable('users');
    const repo = cnn.getRepository(User);
    const userSampleDb = { ...userSample };
    /**
     * Hash password for user sample.
     */
    const passwordHash = await bcrypt.hash(userSample.password, 10);
    userSampleDb.password = passwordHash;
    const rs = await repo.insert(userSampleDb);
  });
  afterAll(async () => {
    await cnn.close();
  });

  it(`User should be found`, async () => {
    const { data } = await axiosWithAuth({
      baseUrl,
      payloadJwt,
    }).get('auth/profile');
    expect(data).toMatchObject({
      email: userSample.email,
    });
  });
  it(`User should be found`, async () => {
    axiosWithAuth({
      baseUrl,
      payloadJwt: {
        email: 'wrongemail@fail.com',
        userId: '1111',
      },
    })
      .get('auth/profile')
      .catch(({ status }: AxiosResponse) => {
        expect(status).toBe(401);
      });
  });
});
