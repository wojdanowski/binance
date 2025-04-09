import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BinanceClientModule } from './binance-client/binance-client.module';
import { HttpModule } from '@nestjs/axios';
import { BinanceStatsController } from './binance-stats/binance-stats.controller';
import { BinanceStatsModule } from './binance-stats/binance-stats.module';

@Module({
  imports: [
    BinanceClientModule,
    BinanceStatsModule,
    HttpModule.register({ global: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
