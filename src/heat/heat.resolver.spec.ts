import { Test, TestingModule } from '@nestjs/testing';
import { HeatResolver } from './heat.resolver';

describe('HeatResolver', () => {
  let resolver: HeatResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeatResolver],
    }).compile();

    resolver = module.get<HeatResolver>(HeatResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
