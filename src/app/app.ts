import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CryptoService } from './core/services/crypto.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('dinametra-crypto-dashboard');

  constructor(private readonly cryptoService: CryptoService) {}

  ngOnInit(): void {
    this.cryptoService.getMarkets('usd').subscribe({
      next: (data) => {
        console.log('Markets:', data);
      },
      error: (error) => {
        console.error(error.message);
      },
    });

    this.cryptoService.getMarketChart('bitcoin', 'usd', 7).subscribe({
      next: (data) => {
        console.log('Bitcoin chart:', data);
      },
      error: (error) => {
        console.error(error.message);
      },
    });
  }
}