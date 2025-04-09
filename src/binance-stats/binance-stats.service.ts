import { Injectable, Logger } from '@nestjs/common';
import {
  GetBinanceStatsParams,
  GetBinanceStatsResponse,
} from './dto/get-binance-stats.dto';
import {
  BinanceAggTradesResponse,
  BinanceClientService,
} from 'src/binance-client/binance-client.service';
import { start } from 'repl';

@Injectable()
export class BinanceStatsService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly binanceClientService: BinanceClientService) {}

  public async getBinanceStats(params: GetBinanceStatsParams): Promise<any> {
    // because Binance api does not let you provide startTime/endTime along with fromId
    const { startId, endId } = await this.getIdRangeBasedOnTimeRange(params);

    const batches = await this.getTradesBatches(startId, endId, params.symbol);

    const allRecordsGroupedBySeconds: Record<
      string,
      {
        sum: number;
        tradesCount: number;
      }
    > = {};

    for await (const batch of batches) {
      batch.forEach((trade) => {
        const date = new Date(trade.T).toISOString().split('.')[0];

        if (!allRecordsGroupedBySeconds[date]) {
          allRecordsGroupedBySeconds[date] = {
            sum: 0,
            tradesCount: 0,
          };
        }

        allRecordsGroupedBySeconds[date] = {
          sum: allRecordsGroupedBySeconds[date].sum + parseFloat(trade.p),
          tradesCount: allRecordsGroupedBySeconds[date].tradesCount + 1,
        };
      });
    }

    return;
  }

  public async *getTradesBatches(
    startId: number,
    endId: number,
    symbol: string,
  ): AsyncGenerator<BinanceAggTradesResponse[], void, undefined> {
    let fromId = startId;

    while (true) {
      if (fromId > endId) {
        break;
      }

      const data = await this.binanceClientService.fetchTrades({
        fromId,
        symbol,
      });

      if (!data.length) {
        break;
      }

      fromId = data.at(-1)!.a + 1;

      yield data;
    }
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
