import { CurrencyCode } from './currency-code.model';

export type SortOption = 'market_cap_desc' | 'volume_desc' | 'rank_asc';

export interface CryptoFilters {
  coinId: string;
  currency: CurrencyCode;
  days: number;
  sortBy: SortOption;
}