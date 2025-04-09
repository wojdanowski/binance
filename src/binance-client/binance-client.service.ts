import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';

export interface BinanceAggTradesResponse {
  a: number; // Aggregate tradeId
  p: string; // Price
  q: string; // Quantity
  f: number; // First tradeId
  l: number; // Last tradeId
  T: number; // Timestamp
  m: true; // Was the buyer the maker?
  M: true; // Was the trade the best price match?
}

@Injectable()
export class BinanceClientService {
  private readonly logger = new Logger(this.constructor.name);

  constructor(private readonly httpService: HttpService) {}

  public async fetchTrades(params: {
    startTime?: number;
    endTime?: number;
    limit?: number;
    symbol?: string;
  }): Promise<BinanceAggTradesResponse[]> {
    const url = 'https://testnet.binance.vision/api/v3/aggTrades';

    const { data } = await firstValueFrom(
      this.httpService.get<BinanceAggTradesResponse[]>(url, { params }).pipe(
        catchError((error: AxiosError) => {
          this.logger.error(error.response?.data);
          throw new Error('Error while fetching binance data');
        }),
      ),
    );

    if (!data) {
      throw new NotFoundException();
    }

    return data;
  }
}
