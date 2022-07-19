import { Test, TestingModule } from '@nestjs/testing';
import { HealthcenterController } from './healthcenter.controller';

describe('HealthcenterController', () => {
  let controller: HealthcenterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthcenterController],
    }).compile();

    controller = module.get<HealthcenterController>(HealthcenterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
