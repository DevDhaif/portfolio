/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://devdhaif.vercel.app',
    generateRobotsTxt: true,
    generateIndexSitemap: false,
    exclude: ['/admin/*', '/login'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
        additionalSitemaps: [
            'https://devdhaif.vercel.app/server-sitemap.xml',
        ],
    },
    transform: async (config, path) => {
        return {
            loc: path,
            changefreq: path === '/' ? 'daily' : 'weekly',
            priority: path === '/' ? 1.0 : 0.8,
            lastmod: new Date().toISOString(),
        }
    },
}