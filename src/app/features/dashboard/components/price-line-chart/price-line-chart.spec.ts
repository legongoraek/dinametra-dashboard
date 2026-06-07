import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceLineChartComponent } from './price-line-chart';

describe('PriceLineChartComponent', () => {
  let component: PriceLineChartComponent;
  let fixture: ComponentFixture<PriceLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceLineChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PriceLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create price line chart component', () => {
    expect(component).toBeTruthy();
  });

  it('should update chart data when chart input changes', () => {
    component.coinName = 'Bitcoin';
    component.chart = {
      prices: [
        [1717700000000, 65000],
        [1717786400000, 65500],
      ],
      market_caps: [],
      total_volumes: [],
    };

    component.ngOnChanges();

    expect(component.lineChartData.labels?.length).toBe(2);
    expect(component.lineChartData.datasets[0].data.length).toBe(2);
  });
});