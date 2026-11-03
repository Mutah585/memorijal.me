import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_ORIGIN = 'https://memorijal.me';
const LASTMOD = '2026-11-03';

interface SitemapRouteConfig {
  path: string;
  priority: string;
  changefreq: 'daily' | 'weekly' | 'monthly';
}

/**
 * Exhaustive route table matching src/data/seo-routes.ts
 */
const SITEMAP_ROUTES: SitemapRouteConfig[] = [
  // 1. Root / Pillar Hubs
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/services/repatriation-air-cargo/', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/repatriation-road/', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/cremation-serbia/', priority: '0.95', changefreq: 'weekly' },
  { path: '/services/legal-consular/', priority: '0.9', changefreq: 'weekly' },

  // 2. Programmatic Destination & Corridor Hubs (The 9 Primary Corridors)
  { path: '/repatriation/to-united-kingdom/', priority: '0.9', changefreq: 'weekly' },
  { path: '/repatriation/to-germany/', priority: '0.9', changefreq: 'weekly' },
  { path: '/repatriation/to-russia/', priority: '0.9', changefreq: 'weekly' },
  { path: '/repatriation/to-ukraine/', priority: '0.9', changefreq: 'weekly' },
  { path: '/repatriation/to-serbia/', priority: '0.9', changefreq: 'weekly' },
  { path: '/repatriation/to-poland/', priority: '0.9', changefreq: 'weekly' },
  { path: '/repatriation/to-france/', priority: '0.9', changefreq: 'weekly' },
  { path: '/repatriation/to-turkey/', priority: '0.9', changefreq: 'weekly' },
  { path: '/repatriation/to-italy/', priority: '0.9', changefreq: 'weekly' },

  // 3. Programmatic Local Municipal / Hospital Catchment Hubs (Montenegro)
  { path: '/location/tivat/', priority: '0.85', changefreq: 'weekly' },
  { path: '/location/kotor/', priority: '0.85', changefreq: 'weekly' },
  { path: '/location/budva/', priority: '0.85', changefreq: 'weekly' },
  { path: '/location/podgorica/', priority: '0.85', changefreq: 'weekly' },
  { path: '/location/herceg-novi/', priority: '0.85', changefreq: 'weekly' },
  { path: '/location/bar/', priority: '0.85', changefreq: 'weekly' },

  // 4. Resource / Legal / Transparency Pages
  { path: '/pricing-breakdown/', priority: '0.85', changefreq: 'weekly' },
  { path: '/step-by-step-guide/', priority: '0.9', changefreq: 'weekly' },
  { path: '/about/director/', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact/', priority: '0.85', changefreq: 'monthly' },
];

const LOCALES: Array<{ slug: 'en' | 'ru' | 'mne'; hreflang: string }> = [
  { slug: 'en', hreflang: 'en' },
  { slug: 'ru', hreflang: 'ru' },
  { slug: 'mne', hreflang: 'sr-ME' },
];

function buildUrl(localeSlug: string, routePath: string): string {
  if (routePath === '/') {
    return `${SITE_ORIGIN}/${localeSlug}/`;
  }
  return `${SITE_ORIGIN}/${localeSlug}${routePath}`;
}

function generateSitemapXml(): string {
  const urlEntries: string[] = [];

  for (const route of SITEMAP_ROUTES) {
    const enHref = buildUrl('en', route.path);
    const ruHref = buildUrl('ru', route.path);
    const mneHref = buildUrl('mne', route.path);

    for (const locale of LOCALES) {
      const locUrl = buildUrl(locale.slug, route.path);
      urlEntries.push(`  <url>
    <loc>${locUrl}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${enHref}" />
    <xhtml:link rel="alternate" hreflang="ru" href="${ruHref}" />
    <xhtml:link rel="alternate" hreflang="sr-ME" href="${mneHref}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${enHref}" />
  </url>`);
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlEntries.join('\n')}
</urlset>
`;
}

function generateRobotsTxt(): string {
  return `# Memorijal d.o.o. Montenegro — Technical SEO Robots Policy
User-agent: *
Allow: /
Allow: /assets/
Allow: /en/
Allow: /ru/
Allow: /mne/

# Disallow non-indexable modal, admin, and raw query parameter states
Disallow: /admin/
Disallow: /api/
Disallow: /*?modal=*
Disallow: /*?checkout=*
Disallow: /*?session=*

Sitemap: ${SITE_ORIGIN}/sitemap.xml
`;
}

function main() {
  const publicDir = path.resolve(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  const robotsPath = path.join(publicDir, 'robots.txt');

  fs.writeFileSync(sitemapPath, generateSitemapXml(), 'utf-8');
  fs.writeFileSync(robotsPath, generateRobotsTxt(), 'utf-8');

  console.log(
    `[SEO Engine] Generated ${SITEMAP_ROUTES.length * LOCALES.length} localized URLs in public/sitemap.xml and public/robots.txt`
  );
}

main();

