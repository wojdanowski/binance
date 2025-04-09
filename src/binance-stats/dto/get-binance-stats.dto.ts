import { Transform, Type } from 'class-transformer';
import { IsInt, IsPositive, IsString } from 'class-validator';

export class GetBinanceStatsParams {
  @IsString()
  symbol: string;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @Transform(({ obj, value }) => parseInt(value, 10))
  startTime: number;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @Transform(({ obj, value }) => parseInt(value, 10))
  endTime: number;
}

export type GetBinanceStatsResponse = Record<
  string,
  {
    averagePrice: number;
    changePercentage: string;
  }
>;
