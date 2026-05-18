import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const inputPath = process.argv[2] || path.join(root, 'data', 'linkedin-posts.csv');
const outputDir = path.join(root, 'reports');
const reportPath = path.join(outputDir, 'linkedin-analysis.md');
const jsonPath = path.join(outputDir, 'linkedin-analysis.json');

const requiredColumns = [
  'date',
  'time',
  'text',
  'format',
  'topic',
  'impressions',
  'likes',
  'comments',
  'reposts',
  'clicks',
];

function parseCsv(content) {
  const rows = [];
  let field = '';
  let row = [];
  let insideQuotes = false;

  for (let index = 0; index < content.length; index += 1) {
    const char = content[index];
    const next = content[index + 1];

    if (char === '"' && insideQuotes && next === '"') {
      field += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      insideQuotes = !insideQuotes;
      continue;
    }

    if (char === ',' && !insideQuotes) {
      row.push(field);
      field = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !insideQuotes) {
      if (char === '\r' && next === '\n') index += 1;
      row.push(field);
      field = '';
      if (row.some((value) => value.trim() !== '')) rows.push(row);
      row = [];
      continue;
    }

    field += char;
  }

  row.push(field);
  if (row.some((value) => value.trim() !== '')) rows.push(row);

  const headers = rows.shift()?.map((header) => header.trim()) || [];
  return rows.map((values) =>
    Object.fromEntries(headers.map((header, index) => [header, values[index]?.trim() || ''])),
  );
}

function toNumber(value) {
  if (!value) return 0;
  const normalized = String(value).replaceAll('.', '').replaceAll(',', '.').replace(/[^\d.-]/g, '');
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseHour(time) {
  const match = String(time || '').match(/(\d{1,2})/);
  if (!match) return null;
  const hour = Number(match[1]);
  return hour >= 0 && hour <= 23 ? hour : null;
}

function dayName(dateValue) {
  if (!dateValue) return 'Sin fecha';
  const date = new Date(`${dateValue}T12:00:00`);
  if (Number.isNaN(date.getTime())) return 'Sin fecha';
  return new Intl.DateTimeFormat('es-ES', { weekday: 'long' }).format(date);
}

function bucketTextLength(length) {
  if (length < 250) return 'Corto (<250)';
  if (length < 700) return 'Medio (250-699)';
  if (length < 1300) return 'Largo (700-1299)';
  return 'Muy largo (1300+)';
}

function bucketHour(hour) {
  if (hour === null) return 'Sin hora';
  if (hour < 8) return 'Madrugada';
  if (hour < 12) return 'Manana';
  if (hour < 16) return 'Mediodia';
  if (hour < 20) return 'Tarde';
  return 'Noche';
}

function pearson(items, xKey, yKey) {
  const pairs = items
    .map((item) => [item[xKey], item[yKey]])
    .filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y));

  if (pairs.length < 3) return null;

  const xMean = pairs.reduce((sum, [x]) => sum + x, 0) / pairs.length;
  const yMean = pairs.reduce((sum, [, y]) => sum + y, 0) / pairs.length;
  const numerator = pairs.reduce((sum, [x, y]) => sum + (x - xMean) * (y - yMean), 0);
  const xDenominator = Math.sqrt(pairs.reduce((sum, [x]) => sum + (x - xMean) ** 2, 0));
  const yDenominator = Math.sqrt(pairs.reduce((sum, [, y]) => sum + (y - yMean) ** 2, 0));

  if (!xDenominator || !yDenominator) return null;
  return numerator / (xDenominator * yDenominator);
}

function groupBy(items, key) {
  return items.reduce((groups, item) => {
    const value = item[key] || 'Sin clasificar';
    groups[value] = groups[value] || [];
    groups[value].push(item);
    return groups;
  }, {});
}

function summarizeGroups(items, key) {
  return Object.entries(groupBy(items, key))
    .map(([name, group]) => ({
      name,
      posts: group.length,
      avgImpressions: average(group, 'impressions'),
      avgEngagementRate: average(group, 'engagementRate'),
      avgEngagementScore: average(group, 'engagementScore'),
      totalInteractions: group.reduce((sum, item) => sum + item.interactions, 0),
    }))
    .sort((a, b) => b.avgEngagementScore - a.avgEngagementScore);
}

function average(items, key) {
  if (!items.length) return 0;
  return items.reduce((sum, item) => sum + item[key], 0) / items.length;
}

function formatPercent(value) {
  return `${(value * 100).toFixed(2)}%`;
}

function formatNumber(value) {
  return Math.round(value).toLocaleString('es-ES');
}

function table(rows, columns) {
  if (!rows.length) return '_Sin datos suficientes._';
  const header = `| ${columns.map((column) => column.label).join(' | ')} |`;
  const separator = `| ${columns.map(() => '---').join(' | ')} |`;
  const body = rows
    .map((row) => `| ${columns.map((column) => column.render(row)).join(' | ')} |`)
    .join('\n');
  return `${header}\n${separator}\n${body}`;
}

function validateColumns(content) {
  const firstLine = content.split(/\r?\n/)[0] || '';
  const headers = firstLine.split(',').map((header) => header.trim());
  const missing = requiredColumns.filter((column) => !headers.includes(column));
  if (missing.length) {
    throw new Error(`Faltan columnas en el CSV: ${missing.join(', ')}`);
  }
}

function buildInsights(posts) {
  const insights = [];
  const topicLeader = summarizeGroups(posts, 'topic')[0];
  const hourLeader = summarizeGroups(posts, 'hourBucket')[0];
  const formatLeader = summarizeGroups(posts, 'format')[0];
  const lengthCorrelation = pearson(posts, 'textLength', 'engagementScore');
  const hourCorrelation = pearson(
    posts.filter((post) => post.hour !== null),
    'hour',
    'engagementScore',
  );

  if (topicLeader) {
    insights.push(`Tema con mejor promedio de rendimiento: ${topicLeader.name}.`);
  }
  if (formatLeader) {
    insights.push(`Formato con mejor promedio: ${formatLeader.name}.`);
  }
  if (hourLeader) {
    insights.push(`Franja horaria con mejor promedio: ${hourLeader.name}.`);
  }
  if (lengthCorrelation !== null) {
    const direction = lengthCorrelation > 0.15 ? 'positiva' : lengthCorrelation < -0.15 ? 'negativa' : 'debil';
    insights.push(`Relacion longitud-rendimiento: ${direction} (r=${lengthCorrelation.toFixed(2)}).`);
  }
  if (hourCorrelation !== null) {
    const direction = hourCorrelation > 0.15 ? 'positiva' : hourCorrelation < -0.15 ? 'negativa' : 'debil';
    insights.push(`Relacion hora-rendimiento: ${direction} (r=${hourCorrelation.toFixed(2)}).`);
  }

  return insights;
}

if (!fs.existsSync(inputPath)) {
  throw new Error(`No encuentro el CSV en ${inputPath}`);
}

const content = fs.readFileSync(inputPath, 'utf8');
validateColumns(content);

const rawRows = parseCsv(content);
const posts = rawRows
  .map((row, index) => {
    const impressions = toNumber(row.impressions);
    const likes = toNumber(row.likes);
    const comments = toNumber(row.comments);
    const reposts = toNumber(row.reposts);
    const clicks = toNumber(row.clicks);
    const text = row.text || '';
    const hour = parseHour(row.time);
    const interactions = likes + comments + reposts + clicks;

    return {
      id: index + 1,
      date: row.date,
      time: row.time,
      postUrl: row.post_url || '',
      text,
      preview: text.replace(/\s+/g, ' ').slice(0, 90),
      format: row.format || 'Sin formato',
      topic: row.topic || 'Sin tema',
      impressions,
      likes,
      comments,
      reposts,
      clicks,
      interactions,
      weightedInteractions: likes + comments * 3 + reposts * 4 + clicks * 2,
      engagementRate: impressions ? interactions / impressions : 0,
      engagementScore: impressions ? (likes + comments * 3 + reposts * 4 + clicks * 2) / impressions : interactions,
      textLength: text.length,
      textLengthBucket: bucketTextLength(text.length),
      hour,
      hourBucket: bucketHour(hour),
      weekday: dayName(row.date),
    };
  })
  .filter((post) => post.text || post.impressions || post.interactions);

fs.mkdirSync(outputDir, { recursive: true });

if (!posts.length) {
  const emptyReport = `# Analisis LinkedIn ACTEO Management

Todavia no hay posts cargados en \`${path.relative(root, inputPath)}\`.

Rellena el CSV con posts de LinkedIn y vuelve a ejecutar:

\`\`\`bash
npm run analyze:linkedin
\`\`\`
`;
  fs.writeFileSync(reportPath, emptyReport);
  fs.writeFileSync(jsonPath, JSON.stringify({ posts: [], insights: [] }, null, 2));
  console.log(`Informe creado sin datos: ${reportPath}`);
  process.exit(0);
}

const sortedByScore = [...posts].sort((a, b) => b.engagementScore - a.engagementScore);
const insights = buildInsights(posts);
const output = {
  generatedAt: new Date().toISOString(),
  source: inputPath,
  totals: {
    posts: posts.length,
    impressions: posts.reduce((sum, post) => sum + post.impressions, 0),
    interactions: posts.reduce((sum, post) => sum + post.interactions, 0),
    avgEngagementRate: average(posts, 'engagementRate'),
    avgEngagementScore: average(posts, 'engagementScore'),
  },
  correlations: {
    textLengthVsScore: pearson(posts, 'textLength', 'engagementScore'),
    hourVsScore: pearson(posts.filter((post) => post.hour !== null), 'hour', 'engagementScore'),
  },
  insights,
  groups: {
    byTopic: summarizeGroups(posts, 'topic'),
    byFormat: summarizeGroups(posts, 'format'),
    byHourBucket: summarizeGroups(posts, 'hourBucket'),
    byWeekday: summarizeGroups(posts, 'weekday'),
    byTextLength: summarizeGroups(posts, 'textLengthBucket'),
  },
  posts: sortedByScore,
};

const markdown = `# Analisis LinkedIn ACTEO Management

Fuente: \`${path.relative(root, inputPath)}\`

## Resumen

- Posts analizados: ${output.totals.posts}
- Impresiones totales: ${formatNumber(output.totals.impressions)}
- Interacciones totales: ${formatNumber(output.totals.interactions)}
- Engagement medio: ${formatPercent(output.totals.avgEngagementRate)}
- Score medio ponderado: ${formatPercent(output.totals.avgEngagementScore)}

## Lecturas rapidas

${insights.map((insight) => `- ${insight}`).join('\n') || '- Todavia no hay suficientes datos para extraer patrones.'}

## Mejores posts

${table(sortedByScore.slice(0, 10), [
  { label: 'Fecha', render: (row) => `${row.date} ${row.time}`.trim() },
  { label: 'Tema', render: (row) => row.topic },
  { label: 'Formato', render: (row) => row.format },
  { label: 'Impresiones', render: (row) => formatNumber(row.impressions) },
  { label: 'Engagement', render: (row) => formatPercent(row.engagementRate) },
  { label: 'Score', render: (row) => formatPercent(row.engagementScore) },
  { label: 'Post', render: (row) => row.preview.replaceAll('|', '/') },
])}

## Por tema

${table(output.groups.byTopic, [
  { label: 'Tema', render: (row) => row.name },
  { label: 'Posts', render: (row) => row.posts },
  { label: 'Impresiones medias', render: (row) => formatNumber(row.avgImpressions) },
  { label: 'Engagement medio', render: (row) => formatPercent(row.avgEngagementRate) },
  { label: 'Score medio', render: (row) => formatPercent(row.avgEngagementScore) },
])}

## Por formato

${table(output.groups.byFormat, [
  { label: 'Formato', render: (row) => row.name },
  { label: 'Posts', render: (row) => row.posts },
  { label: 'Impresiones medias', render: (row) => formatNumber(row.avgImpressions) },
  { label: 'Engagement medio', render: (row) => formatPercent(row.avgEngagementRate) },
  { label: 'Score medio', render: (row) => formatPercent(row.avgEngagementScore) },
])}

## Por franja horaria

${table(output.groups.byHourBucket, [
  { label: 'Franja', render: (row) => row.name },
  { label: 'Posts', render: (row) => row.posts },
  { label: 'Impresiones medias', render: (row) => formatNumber(row.avgImpressions) },
  { label: 'Engagement medio', render: (row) => formatPercent(row.avgEngagementRate) },
  { label: 'Score medio', render: (row) => formatPercent(row.avgEngagementScore) },
])}

## Por dia de la semana

${table(output.groups.byWeekday, [
  { label: 'Dia', render: (row) => row.name },
  { label: 'Posts', render: (row) => row.posts },
  { label: 'Impresiones medias', render: (row) => formatNumber(row.avgImpressions) },
  { label: 'Engagement medio', render: (row) => formatPercent(row.avgEngagementRate) },
  { label: 'Score medio', render: (row) => formatPercent(row.avgEngagementScore) },
])}

## Por longitud

${table(output.groups.byTextLength, [
  { label: 'Longitud', render: (row) => row.name },
  { label: 'Posts', render: (row) => row.posts },
  { label: 'Impresiones medias', render: (row) => formatNumber(row.avgImpressions) },
  { label: 'Engagement medio', render: (row) => formatPercent(row.avgEngagementRate) },
  { label: 'Score medio', render: (row) => formatPercent(row.avgEngagementScore) },
])}
`;

fs.writeFileSync(jsonPath, `${JSON.stringify(output, null, 2)}\n`);
fs.writeFileSync(reportPath, markdown);
console.log(`Informe Markdown: ${reportPath}`);
console.log(`Datos JSON: ${jsonPath}`);
