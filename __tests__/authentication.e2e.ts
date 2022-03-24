import { User } from '../src/app/entities/user.entity';
import axios, { AxiosResponse } from 'axios';
import { createConnection, Connection } from 'typeorm';
import { userSample } from './seeds/authen';
import * as bcrypt from 'bcrypt';
import { getBaseUrl } from './utils/common';
const baseUrl = getBaseUrl();
describe('Authentication', () => {
  let conn: Connection;
  /**
   * For some cases, You need to prepare data in db before run your test case.
   * You can put seed data in function `beforeAll` or `beforeEach`
   *
   */
  beforeAll(async () => {
    conn = await createConnection();
    await conn.createQueryRunner().clearTable('users');
    const repo = conn.getRepository(User);
    const userSampleDb = { ...userSample };
    /**
     * Hash password for user sample.
     */
    const passwordHash = await bcrypt.hash(userSample.password, 10);
    userSampleDb.password = passwordHash;
    const rs = await repo.insert(userSampleDb);
  });
  afterAll(async () => {
    await conn.createQueryRunner().clearTable('users');
  });

  it('Match.email.and.password.should.successful', async () => {
    const { data } = await axios.create({ baseURL: baseUrl }).post('auth/login', {
      email: 'duythanhcn@gmail.com',
      password: '1234567',
    });
    expect(data).toMatchObject({
      data: {
        accessToken: expect.any(String),
      },
    });
  });

  it('Wrong.password.should.be.fail', async () => {
    try {
      await axios.create({ baseURL: baseUrl }).post('auth/login', {
        email: 'duythanhcn@gmail.com',
      });
    } catch (error) {
      expect(error.response.status).toBe(401);
    }
  });
});
