import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { App } from './app';
import { CryptoService } from './core/services/crypto.service';

describe('App', () => {
  let getMarketsCalls = 0;
  let getMarketChartCalls = 0;
  let clearCacheCalls = 0;

  const cryptoServiceMock = {
    getMarkets: () => {
      getMarketsCalls++;

      return of([
        {
          id: 'bitcoin',
          symbol: 'btc',
          name: 'Bitcoin',
          image: '',
          current_price: 65000,
          market_cap: 1000000000,
          market_cap_rank: 1,
          total_volume: 50000000,
          high_24h: 66000,
          low_24h: 64000,
          price_change_percentage_24h: 2.5,
          last_updated: '2026-06-07T00:00:00.000Z',
        },
      ]);
    },
    getMarketChart: () => {
      getMarketChartCalls++;

      return of({
        prices: [[1717700000000, 65000]],
        market_caps: [[1717700000000, 1000000000]],
        total_volumes: [[1717700000000, 50000000]],
      });
    },
    clearCache: () => {
      clearCacheCalls++;
    },
  };

  beforeEach(async () => {
    getMarketsCalls = 0;
    getMarketChartCalls = 0;
    clearCacheCalls = 0;

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        {
          provide: CryptoService,
          useValue: cryptoServiceMock,
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('should load dashboard data on init', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    fixture.detectChanges();

    expect(getMarketsCalls).toBeGreaterThan(0);
    expect(getMarketChartCalls).toBeGreaterThan(0);
    expect(app.markets().length).toBe(1);
    expect(app.selectedCoin()?.id).toBe('bitcoin');
    expect(app.priceChart()).toBeTruthy();
  });

  it('should update filters and reload data', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.onFiltersChange({
      coinId: 'bitcoin',
      currency: 'mxn',
      days: 30,
      sortBy: 'volume_desc',
    });

    expect(app.currentFilters()).toEqual({
      coinId: 'bitcoin',
      currency: 'mxn',
      days: 30,
      sortBy: 'volume_desc',
    });

    expect(getMarketsCalls).toBeGreaterThan(0);
    expect(getMarketChartCalls).toBeGreaterThan(0);
  });

  it('should clear cache when retryLoad is called', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.retryLoad();

    expect(clearCacheCalls).toBe(1);
    expect(getMarketsCalls).toBeGreaterThan(0);
    expect(getMarketChartCalls).toBeGreaterThan(0);
  });
});