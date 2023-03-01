import { Test, TestingModule } from '@nestjs/testing';
import { HeatService } from './heat.service';

describe('HeatService', () => {
  let service: HeatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeatService],
    }).compile();

    service = module.get<HeatService>(HeatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
