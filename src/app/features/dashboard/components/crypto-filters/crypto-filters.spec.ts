import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';

import { CryptoFiltersComponent } from './crypto-filters';
import { CryptoFilters } from '../../../../core/models/crypto-filters.model';

describe('CryptoFiltersComponent', () => {
  let component: CryptoFiltersComponent;
  let fixture: ComponentFixture<CryptoFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoFiltersComponent],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(CryptoFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create filters component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filters when emitFilters is called', () => {
    let emittedFilters: CryptoFilters | null = null;

    component.filtersChange.subscribe((filters) => {
      emittedFilters = filters;
    });

    component.filters = {
      coinId: 'ethereum',
      currency: 'mxn',
      days: 30,
      sortBy: 'volume_desc',
    };

    component.emitFilters();

    expect(emittedFilters).toEqual({
      coinId: 'ethereum',
      currency: 'mxn',
      days: 30,
      sortBy: 'volume_desc',
    });
  });

  it('should reset filters to default values', () => {
    let emittedFilters: CryptoFilters | null = null;

    component.filtersChange.subscribe((filters) => {
      emittedFilters = filters;
    });

    component.filters = {
      coinId: 'solana',
      currency: 'eur',
      days: 90,
      sortBy: 'volume_desc',
    };

    component.resetFilters();

    expect(component.filters).toEqual({
      coinId: 'bitcoin',
      currency: 'usd',
      days: 7,
      sortBy: 'market_cap_desc',
    });

    expect(emittedFilters).toEqual({
      coinId: 'bitcoin',
      currency: 'usd',
      days: 7,
      sortBy: 'market_cap_desc',
    });
  });
});