# Flujo de Git y despliegues

Netlify dispone de crédito limitado y lo reinicia el día 15 de cada mes. Para reducir el número de despliegues, aplica estas reglas en este repositorio:

- Mantén commits locales coherentes y enfocados; no combines cambios sin relación solo para aumentar su tamaño.
- Acumula varios cambios relacionados y súbelos juntos en un único lote.
- No ejecutes `git push` ni un despliegue después de cada cambio. Hazlo únicamente cuando el usuario lo solicite expresamente.
- Antes de subir un lote, revisa todos los cambios y ejecuta `npm test -- --watch=false` y `npm run build`.
- Si es necesario subir cambios sin desplegar, agrega `[skip netlify]` al mensaje del último commit del lote e informa claramente que no habrá deploy.
- No reescribas commits ya publicados ni uses force push para agrupar historial existente.

## Estado pendiente

- El commit `0860c0f` (`feat: add Dinametra favicon`) fue publicado en GitHub, pero no se desplegó en Netlify por falta de crédito. Debe incluirse en el próximo despliegue después del reinicio de crédito.
