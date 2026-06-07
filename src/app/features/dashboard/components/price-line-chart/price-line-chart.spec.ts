import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceLineChart } from './price-line-chart';

describe('PriceLineChart', () => {
  let component: PriceLineChart;
  let fixture: ComponentFixture<PriceLineChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceLineChart],
    }).compileComponents();

    fixture = TestBed.createComponent(PriceLineChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
