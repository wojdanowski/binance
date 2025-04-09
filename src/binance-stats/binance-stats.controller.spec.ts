import { Test, TestingModule } from '@nestjs/testing';
import { BinanceStatsController } from './binance-stats.controller';

describe('BinanceStatsController', () => {
  let controller: BinanceStatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BinanceStatsController],
    }).compile();

    controller = module.get<BinanceStatsController>(BinanceStatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
