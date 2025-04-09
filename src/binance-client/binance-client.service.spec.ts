import { Test, TestingModule } from '@nestjs/testing';
import { BinanceClientServiceService } from './binance-client.service';

describe('BinanceClientServiceService', () => {
  let service: BinanceClientServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BinanceClientServiceService],
    }).compile();

    service = module.get<BinanceClientServiceService>(
      BinanceClientServiceService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
