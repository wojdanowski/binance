import { Module } from '@nestjs/common';
import { BinanceStatsService } from './binance-stats.service';
import { BinanceStatsController } from './binance-stats.controller';

@Module({
  imports: [],
  controllers: [BinanceStatsController],
  providers: [BinanceStatsService],
})
export class BinanceStatsModule {}
