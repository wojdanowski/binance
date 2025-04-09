import { Module } from '@nestjs/common';
import { BinanceClientService } from './binance-client.service';
import { LoggerModule } from '@flip/intelligence';

@Module({
  imports: [],
  providers: [BinanceClientService],
})
export class BinanceClientModule {}
