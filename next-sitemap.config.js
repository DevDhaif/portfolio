/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://devdhaif.vercel.app',
  generateRobotsTxt: false, // Using app/robots.ts instead
  generateIndexSitemap: false,
  exclude: [
    '/admin/*',
    '/login',
    '/private',
    '/api/*',
    '/auth/*',
    '/server-sitemap.xml',
  ],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  transform: async (config, path) => {
    // Customize priority and changefreq based on path
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (path.startsWith('/blog')) {
      priority = 0.9;
      changefreq = 'daily';
    } else if (path.startsWith('/projects')) {
      priority = 0.8;
      changefreq = 'weekly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
