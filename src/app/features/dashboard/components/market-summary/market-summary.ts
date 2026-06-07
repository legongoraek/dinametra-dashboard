import { Component, Input } from '@angular/core';

import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

import { CryptoMarket } from '../../../../core/models/crypto-market.model';
import { CurrencyCode } from '../../../../core/models/currency-code.model';

@Component({
  selector: 'app-market-summary',
  imports: [CardModule, TagModule],
  templateUrl: './market-summary.html',
  styleUrl: './market-summary.css',
})
export class MarketSummaryComponent {
  @Input() coin: CryptoMarket | null = null;
  @Input() currency: CurrencyCode = 'usd';

  get currencyCode(): string {
    return this.currency.toUpperCase();
  }

  formatCurrency(value?: number | null): string {
    if (value === null || value === undefined) {
      return 'N/A';
    }

    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: this.currencyCode,
      maximumFractionDigits: value >= 1 ? 2 : 6,
    }).format(value);
  }

  formatPercent(value?: number | null): string {
    if (value === null || value === undefined) {
      return 'N/A';
    }

    return `${value.toFixed(2)}%`;
  }

  get changeSeverity(): 'success' | 'danger' | 'secondary' {
    const change = this.coin?.price_change_percentage_24h ?? 0;

    if (change > 0) {
      return 'success';
    }

    if (change < 0) {
      return 'danger';
    }

    return 'secondary';
  }

  get changeIcon(): string {
    const change = this.coin?.price_change_percentage_24h ?? 0;

    if (change > 0) {
      return 'pi pi-arrow-up-right';
    }

    if (change < 0) {
      return 'pi pi-arrow-down-right';
    }

    return 'pi pi-minus';
  }
}