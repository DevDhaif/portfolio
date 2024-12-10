/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://your-domain.com',
    generateRobotsTxt: true,
    sitemapSize: 7000,
    changefreq: 'daily',
    priority: 0.7,
    exclude: ['/admin/*']
}