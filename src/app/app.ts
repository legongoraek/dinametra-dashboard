import { Component, OnInit, signal } from '@angular/core';
import { forkJoin } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { DividerModule } from 'primeng/divider';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { MessageModule } from 'primeng/message';

import { CryptoFiltersComponent } from './features/dashboard/components/crypto-filters/crypto-filters';
import { MarketSummaryComponent } from './features/dashboard/components/market-summary/market-summary';
import { PriceLineChartComponent } from './features/dashboard/components/price-line-chart/price-line-chart';
import { VolumeBarChartComponent } from './features/dashboard/components/volume-bar-chart/volume-bar-chart';
import { CryptoTableComponent } from './features/dashboard/components/crypto-table/crypto-table';

import { CryptoService } from './core/services/crypto.service';
import { SeoService } from './core/services/seo.service';
import { CryptoFilters } from './core/models/crypto-filters.model';
import { CryptoMarket } from './core/models/crypto-market.model';
import { CryptoMarketChart } from './core/models/crypto-market-chart.model';

@Component({
  selector: 'app-root',
  imports: [
    ButtonModule,
    CardModule,
    TagModule,
    DividerModule,
    ProgressSpinnerModule,
    MessageModule,
    CryptoFiltersComponent,
    MarketSummaryComponent,
    PriceLineChartComponent,
    VolumeBarChartComponent,
    CryptoTableComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('dinametra-crypto-dashboard');

  currentFilters = signal<CryptoFilters>({
    coinId: 'bitcoin',
    currency: 'usd',
    days: 7,
    sortBy: 'market_cap_desc',
  });

  markets = signal<CryptoMarket[]>([]);
  selectedCoin = signal<CryptoMarket | null>(null);
  priceChart = signal<CryptoMarketChart | null>(null);

  isLoading = signal(false);
  errorMessage = signal('');

  constructor(
    private readonly cryptoService: CryptoService,
    seoService: SeoService
  ) {
    seoService.applyDefaultSeo();
  }

  ngOnInit(): void {
    this.loadDashboardData();
  }

  onFiltersChange(filters: CryptoFilters): void {
    this.currentFilters.set(filters);
    this.loadDashboardData();
  }

  retryLoad(): void {
    this.cryptoService.clearCache();
    this.loadDashboardData();
  }

  get hasData(): boolean {
    return this.markets().length > 0 && !!this.selectedCoin();
  }

  private loadDashboardData(): void {
    const filters = this.currentFilters();

    this.isLoading.set(true);
    this.errorMessage.set('');

    forkJoin({
      markets: this.cryptoService.getMarkets(filters.currency, filters.sortBy),
      chart: this.cryptoService.getMarketChart(
        filters.coinId,
        filters.currency,
        filters.days
      ),
    }).subscribe({
      next: ({ markets, chart }) => {
        this.markets.set(markets);
        this.priceChart.set(chart);

        const selected =
          markets.find((coin) => coin.id === filters.coinId) ??
          markets[0] ??
          null;

        this.selectedCoin.set(selected);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set(error.message);
        this.markets.set([]);
        this.selectedCoin.set(null);
        this.priceChart.set(null);
        this.isLoading.set(false);
      },
    });
  }
}
