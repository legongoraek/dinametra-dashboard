import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeBarChart } from './volume-bar-chart';

describe('VolumeBarChart', () => {
  let component: VolumeBarChart;
  let fixture: ComponentFixture<VolumeBarChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolumeBarChart],
    }).compileComponents();

    fixture = TestBed.createComponent(VolumeBarChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
