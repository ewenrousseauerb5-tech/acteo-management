# Analisis de LinkedIn para ACTEO Management

Cuenta objetivo:
https://www.linkedin.com/company/acteo-management/posts/?feedView=all&viewAsMember=true

## Enfoque recomendado

LinkedIn no es buen candidato para scraping automatizado con login: cambia mucho la interfaz, limita la automatizacion y puede bloquear cuentas. Para una consultora pequena, lo mas fiable es crear una base de posts con las metricas que LinkedIn ya muestra al administrador de la pagina y analizarla localmente.

## Como cargar datos

Rellena `data/linkedin-posts.csv` con una fila por post.

Columnas:

- `date`: fecha de publicacion en formato `YYYY-MM-DD`.
- `time`: hora aproximada, por ejemplo `09:30`.
- `post_url`: enlace al post, si lo tienes.
- `text`: texto completo del post.
- `format`: `texto`, `imagen`, `carrusel`, `video`, `encuesta`, `enlace`.
- `topic`: tema principal, por ejemplo `coaching`, `auditoria`, `liderazgo`, `compliance`, `caso-cliente`, `cultura`.
- `impressions`: impresiones.
- `likes`: reacciones.
- `comments`: comentarios.
- `reposts`: reposts/compartidos.
- `clicks`: clics, si LinkedIn los muestra.

## Ejecutar el analisis

```bash
npm run analyze:linkedin
```

El script genera:

- `reports/linkedin-analysis.md`: informe legible.
- `reports/linkedin-analysis.json`: datos procesados para usar en un dashboard posterior.

## Que mide

- Ranking de posts por rendimiento ponderado.
- Engagement rate simple: `(likes + comments + reposts + clicks) / impressions`.
- Score ponderado: da mas peso a comentarios, reposts y clics que a likes.
- Comparativa por tema, formato, franja horaria, dia de la semana y longitud.
- Correlacion aproximada entre longitud del texto, hora de publicacion y rendimiento.

## Si queremos semiautomatizar la captura

Podemos hacer despues una herramienta de navegador que ayude a copiar posts visibles de la pagina, pero conviene mantener las metricas de rendimiento como carga manual/exportada desde LinkedIn Analytics. Esas metricas privadas son las que realmente explican si un post ha funcionado.
