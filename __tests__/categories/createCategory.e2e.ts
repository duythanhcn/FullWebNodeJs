import { Connection, createConnection } from 'typeorm';
import { Category } from '../../src/app/entities/category.entity';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { getBaseUrl } from '../utils/common';
require('dotenv').config();
const baseUrl = getBaseUrl();
/**
 * Sample data
 */
const categorySample: Partial<Category> = {
  categoryName: 'NQTNQT',
  description: 'desciption lorem',
};

describe('Create category', () => {
  let cnn: Connection;
  /**
   * For some cases, You need to prepare data in db before run your test case.
   * You can put seed data in function `beforeAll` or `beforeEach`
   *
   */
  beforeAll(async () => {
    cnn = await createConnection();
    await cnn.createQueryRunner().clearTable('categories');
  });
  /**
   * After all test case of this file. This function will be called.
   * Implement it if you want
   * - Clean database after test
   *
   */
  afterAll(async () => {
    await cnn.createQueryRunner().clearTable('categories');
    await cnn.close();
  });

  it(`Create category should be success`, async () => {
    const { data }: AxiosResponse = await axios.create({ baseURL: baseUrl }).post('categories', categorySample);
    expect(data).toMatchObject({
      statusCode: 200,
    });
  });

  it(`category name length < 6 should be fail`, async () => {
    try {
      await axios.create({ baseURL: baseUrl }).post('categories', {
        categoryName: 'N',
        description: 'desciption lorem',
      });
    } catch (error) {
      expect((error as AxiosError).response.data).toMatchObject({
        statusCode: 400,
        errors: [
          {
            errorCode: 'minLength',
            value: 'N',
            field: 'categoryName',
            message: 'categoryName must be longer than or equal to 6 characters',
          },
        ],
      });
    }
  });

  it(`both name and description length < 6 should be fail`, async () => {
    try {
      await axios.create({ baseURL: baseUrl }).post('categories', {
        categoryName: '',
        description: '',
      });
    } catch (error) {
      expect((error as AxiosError).response.data).toMatchObject({
        statusCode: 400,
        errors: [
          {
            errorCode: 'minLength',
            value: '',
            field: 'categoryName',
            message: 'categoryName must be longer than or equal to 6 characters',
          },
          {
            errorCode: 'minLength',
            value: '',
            field: 'description',
            message: 'description must be longer than or equal to 6 characters',
          },
        ],
      });
    }
  });
});
