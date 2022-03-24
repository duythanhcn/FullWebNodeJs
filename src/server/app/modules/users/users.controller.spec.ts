import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserInputDto } from './dto/user.dto';

describe('Users Controller', () => {
  let controller: UsersController;
  let spyUserService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useFactory: () => ({
            create: jest.fn(() => true),
          }),
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    spyUserService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create.should.be.return.object', async () => {
    const dto = {
      email: 'email@mock.com',
      fullname: 'Full Name',
      gender: 'MALE',
      password: '1234567',
    };
    const rs = await controller.create(dto);
    expect(rs).toBe(true);
    expect(spyUserService.create).toBeCalledWith(dto);
    expect(spyUserService.create).toBeCalledTimes(1);
    expect(spyUserService.create).toBeCalled();
  });
});
