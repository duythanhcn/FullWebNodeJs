import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
/**
 * You can read link below.
 * https://www.carloscaballero.io/part-9-clock-in-out-system-testing-backend-unit-test-services/
 */
describe('AuthService', () => {
  let service: AuthService;
  let testingModule: TestingModule;
  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useFactory: () => ({
            sign: jest.fn(() => 'mock_access_token'),
          }),
        },
        {
          provide: UsersService,
          useFactory: () => {},
        },
      ],
    }).compile();

    service = testingModule.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be defined', async () => {
    const token = await service.login({ email: 'duythanhcn@gmail.com', password: '1234567' });
    expect(token).toMatchObject({
      access_token: 'mock_access_token',
    });
  });
});
