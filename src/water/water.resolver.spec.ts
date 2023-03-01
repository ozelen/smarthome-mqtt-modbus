import { Test, TestingModule } from '@nestjs/testing';
import { WaterResolver } from './water.resolver';

describe('WaterResolver', () => {
  let resolver: WaterResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WaterResolver],
    }).compile();

    resolver = module.get<WaterResolver>(WaterResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
