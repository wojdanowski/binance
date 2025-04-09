import { Injectable, Logger } from '@nestjs/common';
import {
  GetBinanceStatsParams,
  GetBinanceStatsResponse,
} from './dto/get-binance-stats.dto';
import { BinanceClientService } from 'src/binance-client/binance-client.service';
import { start } from 'repl';

@Injectable()
export class BinanceStatsService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly binanceClientService: BinanceClientService) {}

  public async getBinanceStats(params: GetBinanceStatsParams): Promise<any> {
    // because Binance api does not let you provide startTime/endTime along with fromId
    const result = await this.getIdRangeBasedOnTimeRange(params);

    return;
  }

  private async getIdRangeBasedOnTimeRange(
    params: GetBinanceStatsParams,
  ): Promise<{
    startId: number;
    endId: number;
  }> {
    const [startRecord, endRecord] = await Promise.all([
      this.binanceClientService.fetchTrades({
        symbol: params.symbol,
        startTime: params.startTime,
        limit: 1,
      }),
      this.binanceClientService.fetchTrades({
        symbol: params.symbol,
        startTime: params.endTime,
        limit: 1,
      }),
    ]);
    return {
      startId: startRecord[0].a,
      endId: endRecord[0].a,
    };
  }
}
