# Crypto Market Dashboard - Prueba Técnica Dinametra

Dashboard interactivo desarrollado como prueba técnica Front-End para Dinametra.

La aplicación permite visualizar información del mercado de criptomonedas usando la API pública de CoinGecko. Incluye filtros dinámicos, cards de resumen, gráficos interactivos, tabla paginada, manejo de estados de carga/error y diseño responsivo.

## Sitio publicado

La aplicación está desplegada públicamente en Netlify:

https://dinametra-dashboard.netlify.app/

---

## Flujo de despliegues

El crédito disponible en Netlify se reinicia el día 15 de cada mes. Para consumir menos despliegues, los cambios se trabajan en commits locales claros y se agrupan antes de hacer `push` a la rama publicada.

- No se hace `push` automáticamente después de cada cambio.
- Antes de subir un lote se ejecutan las pruebas y el build de producción.
- Los cambios que deban publicarse en GitHub sin generar un deploy pueden usar `[skip netlify]` en el último mensaje de commit del lote.

### Despliegue pendiente

- [ ] Desplegar los cambios del commit `0860c0f` (`feat: add Dinametra favicon`) después del próximo reinicio de crédito de Netlify.
