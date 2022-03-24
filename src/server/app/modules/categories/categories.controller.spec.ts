import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

describe('Categories Controller', () => {
  /**
   * Mock all data response.
   * Because controller `Categories` need to 1 service categories.
   * So we need to prepare all data response of service categories.
   */
  const mockDataResponse = {
    getResponse: {
      categoryId: 1,
      categoryName: 'cateName',
      description: 'des',
    },
    findOneResponse: {
      categoryId: 1,
      categoryName: 'cateName',
      description: 'des',
    },
  };
  let controller: CategoriesController;
  let service: CategoriesService;
  /**
   * We need to mock all services ared injected into controller.
   */
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      /**
       * Contructor function of controller categories need argument CategoriesService.
       * So we need to mock all function of service.
       */
      providers: [
        {
          provide: CategoriesService,
          useFactory: jest.fn(() => ({
            get: jest.fn(() => mockDataResponse.getResponse),
            findOne: jest.fn(() => mockDataResponse.findOneResponse),
          })),
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Find one a category by Id', async () => {
    const result = await controller.get(mockDataResponse.findOneResponse.categoryId);
    expect(result).toMatchObject({
      data: mockDataResponse.findOneResponse,
    });
    expect(service.get).toBeCalledTimes(1);
  });
});
