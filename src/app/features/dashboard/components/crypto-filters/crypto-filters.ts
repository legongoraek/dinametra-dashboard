import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';

import { CryptoFilters, SortOption } from '../../../../core/models/crypto-filters.model';
import { CurrencyCode, CurrencyOption } from '../../../../core/models/currency-code.model';

interface CryptoOption {
  label: string;
  value: string;
}

interface DaysOption {
  label: string;
  value: number;
}

interface SortFilterOption {
  label: string;
  value: SortOption;
}

@Component({
  selector: 'app-crypto-filters',
  imports: [
    FormsModule,
    SelectModule,
    ButtonModule,
  ],
  templateUrl: './crypto-filters.html',
  styleUrl: './crypto-filters.css',
})
export class CryptoFiltersComponent {
  @Output() filtersChange = new EventEmitter<CryptoFilters>();

  filters: CryptoFilters = {
    coinId: 'bitcoin',
    currency: 'usd',
    days: 7,
    sortBy: 'market_cap_desc',
  };

  cryptoOptions: CryptoOption[] = [
    { label: 'Bitcoin', value: 'bitcoin' },
    { label: 'Ethereum', value: 'ethereum' },
    { label: 'Solana', value: 'solana' },
    { label: 'Cardano', value: 'cardano' },
    { label: 'Dogecoin', value: 'dogecoin' },
    { label: 'Ripple', value: 'ripple' },
  ];

  currencyOptions: CurrencyOption[] = [
    { label: 'USD - Dólar estadounidense', value: 'usd', symbol: '$' },
    { label: 'MXN - Peso mexicano', value: 'mxn', symbol: '$' },
    { label: 'EUR - Euro', value: 'eur', symbol: '€' },
  ];

  daysOptions: DaysOption[] = [
    { label: 'Últimas 24 horas', value: 1 },
    { label: 'Últimos 7 días', value: 7 },
    { label: 'Últimos 14 días', value: 14 },
    { label: 'Últimos 30 días', value: 30 },
    { label: 'Últimos 90 días', value: 90 },
  ];

  sortOptions: SortFilterOption[] = [
    { label: 'Mayor capitalización', value: 'market_cap_desc' },
    { label: 'Mayor volumen', value: 'volume_desc' },
    { label: 'Ranking de mercado', value: 'rank_asc' },
  ];

  emitFilters(): void {
    this.filtersChange.emit({ ...this.filters });
  }

  resetFilters(): void {
    this.filters = {
      coinId: 'bitcoin',
      currency: 'usd',
      days: 7,
      sortBy: 'market_cap_desc',
    };

    this.emitFilters();
  }
}