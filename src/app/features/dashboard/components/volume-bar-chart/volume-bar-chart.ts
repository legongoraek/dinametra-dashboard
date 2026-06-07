import { Component, Input, OnChanges } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';

import { CryptoMarket } from '../../../../core/models/crypto-market.model';
import { CurrencyCode } from '../../../../core/models/currency-code.model';

@Component({
  selector: 'app-volume-bar-chart',
  imports: [BaseChartDirective],
  templateUrl: './volume-bar-chart.html',
  styleUrl: './volume-bar-chart.css',
})
export class VolumeBarChartComponent implements OnChanges {
  @Input() markets: CryptoMarket[] = [];
  @Input() currency: CurrencyCode = 'usd';

  barChartType: ChartConfiguration<'bar'>['type'] = 'bar';

  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Volumen 24h',
        data: [],
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    interaction: {
      mode: 'nearest',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#cbd5e1',
          usePointStyle: true,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = Number(context.raw ?? 0);

            return `Volumen 24h: ${this.formatCurrency(value)}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#94a3b8',
          callback: (value) => this.formatCompactCurrency(Number(value)),
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.12)',
        },
      },
      y: {
        ticks: {
          color: '#94a3b8',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  ngOnChanges(): void {
    this.updateChart();
  }

  private updateChart(): void {
    const sortedMarkets = [...this.markets]
      .sort((a, b) => b.total_volume - a.total_volume)
      .slice(0, 8);

    this.barChartData = {
      labels: sortedMarkets.map((coin) => coin.name),
      datasets: [
        {
          label: 'Volumen 24h',
          data: sortedMarkets.map((coin) => coin.total_volume),
          borderWidth: 1,
          borderRadius: 8,
        },
      ],
    };
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: this.currency.toUpperCase(),
      maximumFractionDigits: 2,
    }).format(value);
  }

  private formatCompactCurrency(value: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: this.currency.toUpperCase(),
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(value);
  }
}