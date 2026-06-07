export type MarketChartPoint = [number, number];

export interface CryptoMarketChart {
  prices: MarketChartPoint[];
  market_caps: MarketChartPoint[];
  total_volumes: MarketChartPoint[];
}