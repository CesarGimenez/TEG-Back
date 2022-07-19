import { Test, TestingModule } from '@nestjs/testing';
import { HealthcenterService } from './healthcenter.service';

describe('HealthcenterService', () => {
  let service: HealthcenterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthcenterService],
    }).compile();

    service = module.get<HealthcenterService>(HealthcenterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
