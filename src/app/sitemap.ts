import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://careerjournal2.vercel.app'; // Update on deploy

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // We don't include /analyzer or /journal because they are protected behind auth!
  ];
}