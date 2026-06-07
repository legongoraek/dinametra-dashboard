export type CurrencyCode = 'usd' | 'mxn' | 'eur';

export interface CurrencyOption {
  label: string;
  value: CurrencyCode;
  symbol: string;
}