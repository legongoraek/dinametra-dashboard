import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketSummaryComponent } from './market-summary';

describe('MarketSummaryComponent', () => {
  let component: MarketSummaryComponent;
  let fixture: ComponentFixture<MarketSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarketSummaryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MarketSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create market summary component', () => {
    expect(component).toBeTruthy();
  });

  it('should format currency correctly', () => {
    component.currency = 'usd';

    const result = component.formatCurrency(65000);

    expect(result).toContain('65,000');
  });

  it('should format percentage correctly', () => {
    const result = component.formatPercent(2.456);

    expect(result).toBe('2.46%');
  });

  it('should return success severity when change is positive', () => {
    component.coin = {
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
      price_change_percentage_24h: 3.5,
      last_updated: '2026-06-07T00:00:00.000Z',
    };

    expect(component.changeSeverity).toBe('success');
  });

  it('should return danger severity when change is negative', () => {
    component.coin = {
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
      price_change_percentage_24h: -1.5,
      last_updated: '2026-06-07T00:00:00.000Z',
    };

    expect(component.changeSeverity).toBe('danger');
  });
});