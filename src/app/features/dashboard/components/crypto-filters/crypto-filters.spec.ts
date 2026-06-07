import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoFilters } from './crypto-filters';

describe('CryptoFilters', () => {
  let component: CryptoFilters;
  let fixture: ComponentFixture<CryptoFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoFilters],
    }).compileComponents();

    fixture = TestBed.createComponent(CryptoFilters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
