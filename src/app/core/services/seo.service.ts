import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export const SEO_TITLE =
  'Dinametra Crypto Market Dashboard | Precios y análisis de criptomonedas';

export const SEO_DESCRIPTION =
  'Dashboard interactivo para explorar precios, volumen, capitalización e histórico del mercado de criptomonedas con datos públicos de CoinGecko.';

export const SEO_CANONICAL_URL = 'https://dinametra-dashboard.netlify.app/';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  applyDefaultSeo(): void {
    this.title.setTitle(SEO_TITLE);

    this.meta.updateTag({ name: 'description', content: SEO_DESCRIPTION });
    this.meta.updateTag({
      name: 'robots',
      content:
        'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    });
    this.meta.updateTag({
      name: 'googlebot',
      content:
        'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1',
    });

    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:locale', content: 'es_MX' });
    this.meta.updateTag({ property: 'og:url', content: SEO_CANONICAL_URL });
    this.meta.updateTag({
      property: 'og:site_name',
      content: 'Dinametra Crypto Market Dashboard',
    });
    this.meta.updateTag({ property: 'og:title', content: SEO_TITLE });
    this.meta.updateTag({ property: 'og:description', content: SEO_DESCRIPTION });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: SEO_TITLE });
    this.meta.updateTag({ name: 'twitter:description', content: SEO_DESCRIPTION });

    this.ensureCanonicalLink();
  }

  private ensureCanonicalLink(): void {
    let canonical = this.document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );

    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }

    canonical.href = SEO_CANONICAL_URL;
  }
}
