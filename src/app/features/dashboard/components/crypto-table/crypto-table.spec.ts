import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';

import { CryptoTableComponent } from './crypto-table';

describe('CryptoTableComponent', () => {
  let component: CryptoTableComponent;
  let fixture: ComponentFixture<CryptoTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoTableComponent],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(CryptoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create crypto table component', () => {
    expect(component).toBeTruthy();
  });

  it('should format currency', () => {
    component.currency = 'usd';

    const result = component.formatCurrency(65000);

    expect(result).toContain('65,000');
  });

  it('should format percent', () => {
    expect(component.formatPercent(1.234)).toBe('1.23%');
  });

  it('should return success severity for positive change', () => {
    expect(component.getChangeSeverity(2.5)).toBe('success');
  });

  it('should return danger severity for negative change', () => {
    expect(component.getChangeSeverity(-2.5)).toBe('danger');
  });

  it('should return secondary severity for zero change', () => {
    expect(component.getChangeSeverity(0)).toBe('secondary');
  });
});