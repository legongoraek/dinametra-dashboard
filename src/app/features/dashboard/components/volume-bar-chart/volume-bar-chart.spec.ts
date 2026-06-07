import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeBarChartComponent } from './volume-bar-chart';

describe('VolumeBarChartComponent', () => {
  let component: VolumeBarChartComponent;
  let fixture: ComponentFixture<VolumeBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolumeBarChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VolumeBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create volume bar chart component', () => {
    expect(component).toBeTruthy();
  });

  it('should update chart data with market volume', () => {
    component.markets = [
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
    ];

    component.ngOnChanges();

    expect(component.barChartData.labels?.length).toBe(1);
    expect(component.barChartData.datasets[0].data.length).toBe(1);
  });
});