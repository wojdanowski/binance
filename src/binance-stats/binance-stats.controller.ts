import { Controller, Get, Query } from '@nestjs/common';
import { BinanceStatsService } from './binance-stats.service';
import {
  GetBinanceStatsParams,
  GetBinanceStatsResponse,
} from './dto/get-binance-stats.dto';

@Controller('binance-stats')
export class BinanceStatsController {
  constructor(private readonly binanceStatsService: BinanceStatsService) {}

  @Get('v1')
  public async getBinanceStats(
    @Query() params: GetBinanceStatsParams,
  ): Promise<GetBinanceStatsResponse> {
    return this.binanceStatsService.getBinanceStats(params);
  }
}
