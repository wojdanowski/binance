import { Injectable, Logger } from '@nestjs/common';
import {
  GetBinanceStatsParams,
  GetBinanceStatsResponse,
} from './dto/get-binance-stats.dto';

@Injectable()
export class BinanceStatsService {
  private readonly logger = new Logger(this.constructor.name);

  constructor() {}

  public async getBinanceStats(params: GetBinanceStatsParams): Promise<any> {
    return;
  }
}
