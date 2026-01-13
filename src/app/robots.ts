import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/login', '/private', '/api/', '/auth/'],
      },
    ],
    sitemap: [
      'https://devdhaif.vercel.app/sitemap.xml',
      'https://devdhaif.vercel.app/server-sitemap.xml',
    ],
  };
}
