import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BinanceClientModule } from './binance-client/binance-client.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [BinanceClientModule, HttpModule.register({ global: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
