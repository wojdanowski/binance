import { HttpService } from '@nestjs/axios';
import { Injectable, LoggerService, NotFoundException } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { BinanceClientService } from './binance-client.service';

@Injectable()
export class BinanceClientServiceMock
  implements Required<BinanceClientService>
{
  constructor() {}

  public async fetchTrades(params: {
    startTime?: number;
    endTime?: number;
    limit?: number;
    symbol?: string;
  }): Promise<any> {
    return [
      {
        a: 547686,
        p: '77438.72000000',
        q: '0.10240000',
        f: 559610,
        l: 559610,
        T: 1744186432534,
        m: true,
        M: true,
      },
      {
        a: 547687,
        p: '77438.72000000',
        q: '0.00553000',
        f: 559611,
        l: 559611,
        T: 1744186432560,
        m: true,
        M: true,
      },
      {
        a: 547688,
        p: '77438.71000000',
        q: '0.11173000',
        f: 559612,
        l: 559612,
        T: 1744186432560,
        m: true,
        M: true,
      },
    ];
  }
}
