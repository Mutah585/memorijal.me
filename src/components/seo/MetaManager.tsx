import React, { useEffect } from 'react';
import {
  LocaleSlug,
  SeoRouteEntry,
  buildFullCanonicalUrl,
} from '../../data/seo-routes';

interface MetaManagerProps {
  locale: LocaleSlug;
  route: SeoRouteEntry;
}

export const MetaManager: React.FC<MetaManagerProps> = ({ locale, route }) => {
  const pageData = route.locales[locale];
  const canonicalUrl = buildFullCanonicalUrl(locale, route.path);
  const enUrl = buildFullCanonicalUrl('en', route.path);
  const ruUrl = buildFullCanonicalUrl('ru', route.path);
  const mneUrl = buildFullCanonicalUrl('mne', route.path);

  useEffect(() => {
    // 1. Update HTML lang attribute
    document.documentElement.lang =
      locale === 'mne' ? 'sr-Latn-ME' : locale;

    // 2. Update Document Title
    document.title = pageData.metaTitle;

    // Helper to upsert <meta> tags
    const upsertMeta = (
      selectorAttr: 'name' | 'property',
      selectorVal: string,
      content: string
    ) => {
      let el = document.head.querySelector(
        `meta[${selectorAttr}="${selectorVal}"]`
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(selectorAttr, selectorVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 3. Standard SEO Meta Tags
    upsertMeta('name', 'description', pageData.metaDescription);
    upsertMeta('name', 'keywords', pageData.keywords.join(', '));
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large');

    // 4. OpenGraph Meta Tags
    upsertMeta('property', 'og:title', pageData.metaTitle);
    upsertMeta('property', 'og:description', pageData.metaDescription);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta(
      'property',
      'og:site_name',
      'Memorijal d.o.o. — International Repatriation & Cremation Montenegro'
    );
    upsertMeta(
      'property',
      'og:locale',
      locale === 'ru' ? 'ru_RU' : locale === 'mne' ? 'sr_ME' : 'en_GB'
    );

    // 5. Twitter Card Tags
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', pageData.metaTitle);
    upsertMeta('name', 'twitter:description', pageData.metaDescription);

    // 6. Self-Referencing Canonical Link
    let canonicalLink = document.head.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 7. Bidirectional hreflang Alternate Links (en, ru, sr-ME, x-default)
    const hreflangMap: { hreflang: string; href: string }[] = [
      { hreflang: 'en', href: enUrl },
      { hreflang: 'ru', href: ruUrl },
      { hreflang: 'sr-ME', href: mneUrl },
      { hreflang: 'x-default', href: enUrl },
    ];

    // Remove previous managed hreflang tags and re-insert cleanly
    document.head
      .querySelectorAll('link[rel="alternate"][hreflang]')
      .forEach((node) => node.remove());

    hreflangMap.forEach(({ hreflang, href }) => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hreflang);
      link.setAttribute('href', href);
      document.head.appendChild(link);
    });
  }, [locale, route, pageData, canonicalUrl, enUrl, ruUrl, mneUrl]);

  return null;
};

