import { Module } from '@nestjs/common';
import { BinanceStatsService } from './binance-stats.service';
import { BinanceStatsController } from './binance-stats.controller';
import { BinanceClientModule } from 'src/binance-client/binance-client.module';
import { BinanceClientService } from 'src/binance-client/binance-client.service';

@Module({
  imports: [BinanceClientModule],
  controllers: [BinanceStatsController],
  providers: [BinanceStatsService, BinanceClientService],
})
export class BinanceStatsModule {}
