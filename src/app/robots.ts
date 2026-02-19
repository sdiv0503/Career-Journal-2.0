import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Tell search engines NOT to crawl private user data
      disallow: ['/analyzer/', '/journal/', '/interview/'], 
    },
    sitemap: 'https://careerjournal2.vercel.app/sitemap.xml',
  };
}