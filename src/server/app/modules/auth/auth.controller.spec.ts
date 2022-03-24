import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AuthService } from './auth.service';

describe('Auth Controller', () => {
  let app: INestApplication;
  let controller: AuthController;
  let authenService = {
    login: () => ({
      accessToken: '',
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useFactory: () => ({
            login: jest.fn(() => ({ accessToken: 'mock_token' })),
          }),
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it(`Login.should.be.return.mock.token`, async () => {
    const result = await controller.login({ email: 'duythanhcn@gmail.com', password: '1234567' });
    expect(result).toMatchObject({
      data: {
        accessToken: 'mock_token',
      },
    });
  });
});
