import { Component, Input } from '@angular/core';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';

import { CryptoMarket } from '../../../../core/models/crypto-market.model';
import { CurrencyCode } from '../../../../core/models/currency-code.model';

@Component({
  selector: 'app-crypto-table',
  imports: [
    TableModule,
    TagModule,
    AvatarModule,
  ],
  templateUrl: './crypto-table.html',
  styleUrl: './crypto-table.css',
})
export class CryptoTableComponent {
  @Input() markets: CryptoMarket[] = [];
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

  formatCompactCurrency(value?: number | null): string {
    if (value === null || value === undefined) {
      return 'N/A';
    }

    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: this.currencyCode,
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(value);
  }

  formatPercent(value?: number | null): string {
    if (value === null || value === undefined) {
      return 'N/A';
    }

    return `${value.toFixed(2)}%`;
  }

  formatDate(value?: string | null): string {
    if (!value) {
      return 'N/A';
    }

    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(value));
  }

  getChangeSeverity(value?: number | null): 'success' | 'danger' | 'secondary' {
    if (value === null || value === undefined || value === 0) {
      return 'secondary';
    }

    return value > 0 ? 'success' : 'danger';
  }

  getChangeIcon(value?: number | null): string {
    if (value === null || value === undefined || value === 0) {
      return 'pi pi-minus';
    }

    return value > 0 ? 'pi pi-arrow-up-right' : 'pi pi-arrow-down-right';
  }
}