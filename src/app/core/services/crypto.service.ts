import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  map,
  Observable,
  of,
  retry,
  shareReplay,
  throwError,
  timer,
} from 'rxjs';

import { CryptoMarket } from '../models/crypto-market.model';
import { CryptoMarketChart } from '../models/crypto-market-chart.model';
import { CurrencyCode } from '../models/currency-code.model';
import { SortOption } from '../models/crypto-filters.model';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private readonly apiUrl = 'https://api.coingecko.com/api/v3';

  private readonly marketsCache = new Map<string, Observable<CryptoMarket[]>>();
  private readonly chartCache = new Map<string, Observable<CryptoMarketChart>>();

  constructor(private readonly http: HttpClient) {}

  getMarkets(
    currency: CurrencyCode = 'usd',
    sortBy: SortOption = 'market_cap_desc'
  ): Observable<CryptoMarket[]> {
    const cacheKey = `markets-${currency}-${sortBy}`;

    if (this.marketsCache.has(cacheKey)) {
      return this.marketsCache.get(cacheKey)!;
    }

    const params = new HttpParams()
      .set('vs_currency', currency)
      .set('order', this.getCoinGeckoOrder(sortBy))
      .set('per_page', '10')
      .set('page', '1')
      .set('sparkline', 'false')
      .set('price_change_percentage', '24h');

    const request$ = this.http
      .get<CryptoMarket[]>(`${this.apiUrl}/coins/markets`, { params })
      .pipe(
        map((coins) => coins ?? []),
        retry({
          count: 2,
          delay: (_error, retryCount) => timer(retryCount * 1500),
        }),
        shareReplay(1),
        catchError((error) => {
          this.marketsCache.delete(cacheKey);
          return this.handleError(error);
        })
      );

    this.marketsCache.set(cacheKey, request$);

    return request$;
  }

  getMarketChart(
    coinId: string,
    currency: CurrencyCode = 'usd',
    days: number = 7
  ): Observable<CryptoMarketChart> {
    const cacheKey = `chart-${coinId}-${currency}-${days}`;
    if (this.chartCache.has(cacheKey)) {
      return this.chartCache.get(cacheKey)!;
    }
    const params = new HttpParams()
      .set('vs_currency', currency)
      .set('days', days.toString());

    const request$ = this.http
      .get<CryptoMarketChart>(`${this.apiUrl}/coins/${coinId}/market_chart`, {
        params,
      })
      .pipe(
        retry({
          count: 2,
          delay: (_error, retryCount) => timer(retryCount * 1500),
        }),
        shareReplay(1),
        catchError((error) => {
          this.chartCache.delete(cacheKey);
          return this.handleError(error);
        })
      );

    this.chartCache.set(cacheKey, request$);

    return request$;
  }

  clearCache(): void {
    this.marketsCache.clear();
    this.chartCache.clear();
  }

  private getCoinGeckoOrder(sortBy: SortOption): string {
    const orderMap: Record<SortOption, string> = {
      market_cap_desc: 'market_cap_desc',
      volume_desc: 'volume_desc',
      rank_asc: 'market_cap_desc',
    };

    return orderMap[sortBy];
  }

  private handleError(error: HttpErrorResponse) {
    let message =
      'No se pudieron obtener los datos del mercado. Intenta nuevamente.';

    if (error.status === 0) {
      message =
        'No se pudo conectar con CoinGecko. Revisa tu conexión a internet.';
    }

    if (error.status === 429) {
      message =
        'Se alcanzó el límite de solicitudes de CoinGecko. Intenta nuevamente en unos minutos.';
    }

    if (error.status >= 500) {
      message =
        'CoinGecko no está disponible en este momento. Intenta más tarde.';
    }

    return throwError(() => new Error(message));
  }
}