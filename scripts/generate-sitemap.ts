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
 * Exhaustive 64-route table (192 localized pages across /en/, /ru/, /mne/)
 * matching src/data/seo-routes.ts + Clusters A, B, C, D, E
 */
const SITEMAP_ROUTES: SitemapRouteConfig[] = [
  // 1. Root / Pillar Hubs (5 routes)
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/services/repatriation-air-cargo/', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/repatriation-road/', priority: '0.9', changefreq: 'weekly' },
  { path: '/services/cremation-serbia/', priority: '0.95', changefreq: 'weekly' },
  { path: '/services/legal-consular/', priority: '0.9', changefreq: 'weekly' },

  // 2. Programmatic Destination & Corridor Hubs — The 9 Primary Corridors (9 routes)
  { path: '/repatriation/to-united-kingdom/', priority: '0.9', changefreq: 'weekly' },
  { path: '/repatriation/to-germany/', priority: '0.9', changefreq: 'weekly' },
  { path: '/repatriation/to-russia/', priority: '0.9', changefreq: 'weekly' },
  { path: '/repatriation/to-ukraine/', priority: '0.9', changefreq: 'weekly' },
  { path: '/repatriation/to-serbia/', priority: '0.9', changefreq: 'weekly' },
  { path: '/repatriation/to-poland/', priority: '0.9', changefreq: 'weekly' },
  { path: '/repatriation/to-france/', priority: '0.9', changefreq: 'weekly' },
  { path: '/repatriation/to-turkey/', priority: '0.9', changefreq: 'weekly' },
  { path: '/repatriation/to-italy/', priority: '0.9', changefreq: 'weekly' },

  // 3. Programmatic Local Municipal / Hospital Catchment Hubs — Montenegro (6 routes)
  { path: '/location/tivat/', priority: '0.85', changefreq: 'weekly' },
  { path: '/location/kotor/', priority: '0.85', changefreq: 'weekly' },
  { path: '/location/budva/', priority: '0.85', changefreq: 'weekly' },
  { path: '/location/podgorica/', priority: '0.85', changefreq: 'weekly' },
  { path: '/location/herceg-novi/', priority: '0.85', changefreq: 'weekly' },
  { path: '/location/bar/', priority: '0.85', changefreq: 'weekly' },

  // 4. Resource / Legal / Transparency Pages (4 routes)
  { path: '/pricing-breakdown/', priority: '0.85', changefreq: 'weekly' },
  { path: '/step-by-step-guide/', priority: '0.9', changefreq: 'weekly' },
  { path: '/about/director/', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact/', priority: '0.85', changefreq: 'monthly' },

  // 5. Cluster A: Hospital Mortuaries & Forensic Centers (/mortuary/) (8 routes)
  { path: '/mortuary/opsta-bolnica-kotor/', priority: '0.9', changefreq: 'weekly' },
  { path: '/mortuary/kccg-podgorica/', priority: '0.9', changefreq: 'weekly' },
  { path: '/mortuary/opsta-bolnica-bar/', priority: '0.85', changefreq: 'weekly' },
  { path: '/mortuary/bolnica-meljine-herceg-novi/', priority: '0.85', changefreq: 'weekly' },
  { path: '/mortuary/bolnica-niksic/', priority: '0.8', changefreq: 'weekly' },
  { path: '/mortuary/bolnica-berane/', priority: '0.8', changefreq: 'weekly' },
  { path: '/mortuary/bolnica-cetinje/', priority: '0.8', changefreq: 'weekly' },
  { path: '/mortuary/specijalna-bolnica-risan/', priority: '0.8', changefreq: 'weekly' },

  // 6. Cluster B: Border Crossings & Road/Air Repatriation Checkpoints (/transit/) (8 routes)
  { path: '/transit/dobrakovo-serbia/', priority: '0.9', changefreq: 'weekly' },
  { path: '/transit/ranche-serbia/', priority: '0.8', changefreq: 'weekly' },
  { path: '/transit/debeli-brijeg-croatia/', priority: '0.85', changefreq: 'weekly' },
  { path: '/transit/ilino-brdo-bosnia/', priority: '0.8', changefreq: 'weekly' },
  { path: '/transit/bozaj-albania/', priority: '0.8', changefreq: 'weekly' },
  { path: '/transit/aerodrom-podgorica-cargo/', priority: '0.9', changefreq: 'weekly' },
  { path: '/transit/aerodrom-tivat-transit/', priority: '0.85', changefreq: 'weekly' },
  { path: '/transit/sitnica-bosnia/', priority: '0.8', changefreq: 'weekly' },

  // 7. Cluster C: Travel Insurance & Assistance Providers (/assistance/) (8 routes)
  { path: '/assistance/allianz-assistance/', priority: '0.85', changefreq: 'weekly' },
  { path: '/assistance/axa-assistance/', priority: '0.85', changefreq: 'weekly' },
  { path: '/assistance/europ-assistance/', priority: '0.85', changefreq: 'weekly' },
  { path: '/assistance/balt-assistance/', priority: '0.85', changefreq: 'weekly' },
  { path: '/assistance/savat-assistance/', priority: '0.85', changefreq: 'weekly' },
  { path: '/assistance/direct-insurer-invoice/', priority: '0.9', changefreq: 'weekly' },
  { path: '/assistance/eurocross-assistance/', priority: '0.8', changefreq: 'weekly' },
  { path: '/assistance/coris-international/', priority: '0.8', changefreq: 'weekly' },

  // 8. Cluster D: Municipalities & Cemeteries / Groblja (/cemetery/) (9 routes)
  { path: '/cemetery/groblje-brdista-tivat/', priority: '0.85', changefreq: 'weekly' },
  { path: '/cemetery/groblje-vrbice-kotor/', priority: '0.85', changefreq: 'weekly' },
  { path: '/cemetery/gradsko-groblje-budva/', priority: '0.85', changefreq: 'weekly' },
  { path: '/cemetery/groblje-cepurci-podgorica/', priority: '0.9', changefreq: 'weekly' },
  { path: '/cemetery/groblje-zagoric-podgorica/', priority: '0.8', changefreq: 'weekly' },
  { path: '/cemetery/groblje-svetog-stefana/', priority: '0.8', changefreq: 'weekly' },
  { path: '/cemetery/groblje-lustica-krtole/', priority: '0.8', changefreq: 'weekly' },
  { path: '/cemetery/groblje-savina-herceg-novi/', priority: '0.8', changefreq: 'weekly' },
  { path: '/cemetery/groblje-gvozden-brijeg-bar/', priority: '0.8', changefreq: 'weekly' },

  // 9. Cluster E: Situation-Specific Knowledge Guides (/guides/) (7 routes)
  { path: '/guides/hotel-resort-death-protocol/', priority: '0.9', changefreq: 'weekly' },
  { path: '/guides/cremation-costs-belgrade-montenegro/', priority: '0.9', changefreq: 'weekly' },
  { path: '/guides/zinc-coffin-soldering-rules/', priority: '0.85', changefreq: 'weekly' },
  { path: '/guides/sprovodnica-sanitary-permit-guide/', priority: '0.9', changefreq: 'weekly' },
  { path: '/guides/power-of-attorney-repatriation/', priority: '0.9', changefreq: 'weekly' },
  { path: '/guides/autopsy-obdukcija-montenegro/', priority: '0.85', changefreq: 'weekly' },
  { path: '/guides/urn-air-cabin-transport-rules/', priority: '0.85', changefreq: 'weekly' },
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
  return `# Memorijal d.o.o. Montenegro — Technical SEO & GEO (llms.txt) Robots Policy
User-agent: *
Allow: /
Allow: /assets/
Allow: /en/
Allow: /ru/
Allow: /mne/
Allow: /llms.txt
Allow: /llms-full.txt

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
    `[SEO Engine] Generated ${SITEMAP_ROUTES.length * LOCALES.length} localized URLs (${SITEMAP_ROUTES.length} routes x ${LOCALES.length} locales) in public/sitemap.xml and public/robots.txt`
  );
}

main();
