import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { CryptoService } from './crypto.service';

describe('CryptoService', () => {
  let service: CryptoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CryptoService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(CryptoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get market data from CoinGecko', () => {
    const mockMarkets = [
      {
        id: 'bitcoin',
        symbol: 'btc',
        name: 'Bitcoin',
        image: 'https://example.com/btc.png',
        current_price: 65000,
        market_cap: 1000000000,
        market_cap_rank: 1,
        total_volume: 50000000,
        high_24h: 66000,
        low_24h: 64000,
        price_change_percentage_24h: 2.5,
        last_updated: '2026-06-07T00:00:00.000Z',
      },
    ];

    service.getMarkets('usd', 'market_cap_desc').subscribe((markets) => {
      expect(markets.length).toBe(1);
      expect(markets[0].id).toBe('bitcoin');
      expect(markets[0].current_price).toBe(65000);
    });

    const req = httpMock.expectOne((request) =>
      request.url.includes('/coins/markets')
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('vs_currency')).toBe('usd');
    expect(req.request.params.get('order')).toBe('market_cap_desc');

    req.flush(mockMarkets);
  });

  it('should get historical chart data from CoinGecko', () => {
    const mockChart = {
      prices: [
        [1717700000000, 65000],
        [1717786400000, 65500],
      ],
      market_caps: [
        [1717700000000, 1000000000],
        [1717786400000, 1100000000],
      ],
      total_volumes: [
        [1717700000000, 50000000],
        [1717786400000, 52000000],
      ],
    };

    service.getMarketChart('bitcoin', 'usd', 7).subscribe((chart) => {
      expect(chart.prices.length).toBe(2);
      expect(chart.prices[0][1]).toBe(65000);
    });

    const req = httpMock.expectOne((request) =>
      request.url.includes('/coins/bitcoin/market_chart')
    );

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('vs_currency')).toBe('usd');
    expect(req.request.params.get('days')).toBe('7');

    req.flush(mockChart);
  });
});