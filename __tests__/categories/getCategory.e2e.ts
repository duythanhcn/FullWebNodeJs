import { Connection, createConnection, Repository } from 'typeorm';
import { Category } from '../../src/app/entities/category.entity';
import axios from 'axios';

import { getBaseUrl } from '../utils/common';

require('dotenv').config();
const baseUrl = getBaseUrl();
/**
 * Sample data
 */
const categorySample: Partial<Category> = {
  categoryId: 1,
  categoryName: 'NQT',
  description: 'desciption lorem',
};

describe('getCategory', () => {
  let cnn: Connection;
  let repo: Repository<Category>;
  /**
   * For some cases, You need to prepare data in db before run your test case.
   * You can put seed data in function `beforeAll` or `beforeEach`
   *
   */
  beforeAll(async () => {
    cnn = await createConnection();
    await cnn.createQueryRunner().clearTable('categories');
    repo = cnn.getRepository(Category);
    await repo.insert(categorySample);
  });
  /**
   * After all test case of this file. This function will be called.
   * Implement it if you want
   * - Clean database after test
   *
   */
  afterAll(async () => {
    await repo.clear();
    await cnn.close();
  });

  it(`Shoud.be.response.category`, async () => {
    const res = await axios.create({ baseURL: baseUrl }).get(`categories/${categorySample.categoryId}`);
    expect(res.data).toMatchObject({
      statusCode: 200,
    });
  });
});
