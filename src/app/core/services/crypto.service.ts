import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

import { CryptoMarket } from '../models/crypto-market.model';
import { CryptoMarketChart } from '../models/crypto-market-chart.model';
import { CurrencyCode } from '../models/currency-code.model';
import { SortOption } from '../models/crypto-filters.model';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private readonly apiUrl = 'https://api.coingecko.com/api/v3';

  constructor(private readonly http: HttpClient) {}

  getMarkets(
    currency: CurrencyCode = 'usd',
    sortBy: SortOption = 'market_cap_desc'
  ): Observable<CryptoMarket[]> {
    const params = new HttpParams()
      .set('vs_currency', currency)
      .set('order', this.getCoinGeckoOrder(sortBy))
      .set('per_page', '10')
      .set('page', '1')
      .set('sparkline', 'false')
      .set('price_change_percentage', '24h');

    return this.http
      .get<CryptoMarket[]>(`${this.apiUrl}/coins/markets`, { params })
      .pipe(
        map((coins) => coins ?? []),
        catchError((error) => this.handleError(error))
      );
  }

  getMarketChart(
    coinId: string,
    currency: CurrencyCode = 'usd',
    days: number = 7
  ): Observable<CryptoMarketChart> {
    const params = new HttpParams()
      .set('vs_currency', currency)
      .set('days', days.toString());

    return this.http
      .get<CryptoMarketChart>(`${this.apiUrl}/coins/${coinId}/market_chart`, {
        params,
      })
      .pipe(
        catchError((error) => this.handleError(error))
      );
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