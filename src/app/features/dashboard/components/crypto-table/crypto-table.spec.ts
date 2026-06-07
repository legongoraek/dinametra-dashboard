import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptoTable } from './crypto-table';

describe('CryptoTable', () => {
  let component: CryptoTable;
  let fixture: ComponentFixture<CryptoTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CryptoTable],
    }).compileComponents();

    fixture = TestBed.createComponent(CryptoTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
