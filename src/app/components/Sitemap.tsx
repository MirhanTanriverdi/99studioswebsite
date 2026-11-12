// Sitemap for SEO - This provides the structure for search engines
// In production, you would generate an actual sitemap.xml file

export const sitemapUrls = [
  {
    loc: 'https://99roots-studio.com/',
    priority: 1.0,
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    loc: 'https://99roots-studio.com/appointment',
    priority: 0.9,
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    loc: 'https://99roots-studio.com/shop',
    priority: 0.7,
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    loc: 'https://99roots-studio.com/artists',
    priority: 0.8,
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    loc: 'https://99roots-studio.com/gallery',
    priority: 0.7,
    changefreq: 'weekly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  {
    loc: 'https://99roots-studio.com/aftercare',
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  }
];

// Generate sitemap XML (for reference - would be generated server-side in production)
export const generateSitemapXML = (): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
};

// robots.txt content (for reference)
export const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/

Sitemap: https://99roots-studio.com/sitemap.xml

# Crawl-delay
Crawl-delay: 1
`;
