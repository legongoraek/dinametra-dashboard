import { Component, Input, OnChanges } from '@angular/core';

import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartOptions } from 'chart.js';

import { CryptoMarketChart } from '../../../../core/models/crypto-market-chart.model';
import { CurrencyCode } from '../../../../core/models/currency-code.model';

@Component({
  selector: 'app-price-line-chart',
  imports: [BaseChartDirective],
  templateUrl: './price-line-chart.html',
  styleUrl: './price-line-chart.css',
})
export class PriceLineChartComponent implements OnChanges {
  @Input() chart: CryptoMarketChart | null = null;
  @Input() currency: CurrencyCode = 'usd';
  @Input() coinName = 'Bitcoin';

  lineChartType: ChartConfiguration<'line'>['type'] = 'line';

  lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        label: 'Precio',
        data: [],
        tension: 0.35,
        fill: true,
        pointRadius: 0,
        pointHoverRadius: 5,
        borderWidth: 2,
      },
    ],
  };

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
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

            return `Precio: ${this.formatCurrency(value)}`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#94a3b8',
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8,
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.12)',
        },
      },
      y: {
        ticks: {
          color: '#94a3b8',
          callback: (value) => this.formatCompactCurrency(Number(value)),
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.12)',
        },
      },
    },
  };

  ngOnChanges(): void {
    this.updateChart();
  }

  private updateChart(): void {
    const prices = this.chart?.prices ?? [];

    this.lineChartData = {
      labels: prices.map(([timestamp]) => this.formatDate(timestamp)),
      datasets: [
        {
          label: `Precio de ${this.coinName}`,
          data: prices.map(([, price]) => price),
          tension: 0.35,
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 5,
          borderWidth: 2,
        },
      ],
    };
  }

  private formatDate(timestamp: number): string {
    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: 'short',
    }).format(new Date(timestamp));
  }

  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: this.currency.toUpperCase(),
      maximumFractionDigits: value >= 1 ? 2 : 6,
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