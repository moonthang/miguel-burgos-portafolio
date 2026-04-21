import { MetadataRoute } from 'next';
import { fetchHygraph } from '@/lib/hygraph';

interface Post {
  slug: string;
  publishedDate: string;
}

async function getBlogSlugs(): Promise<Post[]> {
  const query = `
    query GetSlugs {
      posts {
        slug
        publishedDate
      }
    }
  `;
  try {
    const { posts } = await fetchHygraph<{ posts: Post[] }>(query, {}, ['en']);
    return posts;
  } catch (error) {
    console.error("Failed to fetch slugs for sitemap", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://miguel-burgos-portafolio.vercel.app';
  
  const posts = await getBlogSlugs();
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedDate),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/certifications',
    '/projects',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  return [...staticRoutes, ...blogEntries];
}
