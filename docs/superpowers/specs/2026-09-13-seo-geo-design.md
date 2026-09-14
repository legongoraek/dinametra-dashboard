# Dinametra Dashboard SEO/GEO Design

## Goal

Add a maintainable SEO and Generative Engine Optimization (GEO) foundation to the existing single-route Angular dashboard without changing its visual design or runtime behavior.

## Current state

- Angular 21 single-page application deployed at `https://dinametra-dashboard.netlify.app/`.
- One public route and no SSR/prerender layer.
- `src/index.html` only contains a generic title, viewport metadata, base href, and favicon links.
- The visible page already has a useful semantic heading hierarchy (`h1` + section `h2`s).
- Netlify deployment credits are limited; repository instructions require grouped changes and explicit deployment control.

## Approach

Use a static-first SEO/GEO implementation appropriate for a one-route SPA. Keep all crawl-critical metadata in the initial HTML and public static files so crawlers do not depend on Angular executing successfully.

The application UI, component structure, services, styles, charts, and data-loading behavior remain unchanged.

## Canonical identity

- Product name: `Dinametra Crypto Market Dashboard`
- Page title: `Dinametra Crypto Market Dashboard | Precios y análisis de criptomonedas`
- Canonical URL: `https://dinametra-dashboard.netlify.app/`
- Primary language: Spanish (`es`)
- Positioning: public technical front-end project/dashboard using CoinGecko data; metadata must not claim to be Dinametra's official product.

## SEO metadata

`src/index.html` will include:

- Spanish `lang` attribute.
- Descriptive title and meta description.
- `robots` and `googlebot` directives (`index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1`).
- Canonical URL.
- Open Graph metadata: type, locale, URL, site name, title, description.
- Twitter card metadata: summary card, title, description.
- Theme color.
- JSON-LD using `WebApplication` and `SoftwareApplication`-compatible fields, with finance application category, free access, canonical URL, description, language, and CoinGecko as the public data source.

No fabricated ratings, reviews, organization ownership, pricing claims, or unsupported social profile data will be added.

## Crawl/discovery files

Create under `public/` so Angular copies them into the production output:

- `robots.txt`: allow public crawling and point to the sitemap.
- `sitemap.xml`: contain the single canonical URL.
- `llms.txt`: concise machine-readable project description, capabilities, authoritative URL, data-source disclosure, and important content sections for generative search systems.

## GEO strategy

GEO in this implementation means Generative Engine Optimization, not geographic targeting. The strategy is to provide explicit, factual, structured context that AI answer engines can parse:

- Clear product purpose and scope.
- Explicit source attribution to CoinGecko.
- Machine-readable JSON-LD.
- `llms.txt` with canonical, concise project facts.
- Existing semantic headings retained.
- No keyword stuffing or hidden content.

## Testing

Add regression tests to `src/app/app.spec.ts` for the public-facing title/metadata behavior where Angular can verify it. Static files and initial HTML will additionally be reviewed directly in the committed diff.

Required repository verification remains:

- `npm test -- --watch=false`
- `npm run build`

If the execution environment cannot install/clone dependencies, report this limitation explicitly rather than claiming those commands passed.

## Deployment

Implement on `feat/seo-geo`. Commits include `[skip netlify]` to avoid consuming Netlify credits. After review and verification, the change may be integrated into `main`; deployment remains intentionally skipped until explicitly requested or until the repository's deployment batch is authorized.
