import { fetchHygraph } from '@/lib/hygraph';
import { notFound } from 'next/navigation';
import BlogPostContent from './blog-post-content';

interface Post {
  title: string;
  publishedDate: string;
  coverImage: {
    url: string;
  };
  content: {
    html: string;
  };
}

async function getPostBySlug(slug: string, locale: string): Promise<Post | null> {
  const query = `
    query GetPostBySlug($slug: String!, $locales: [Locale!]!) {
      post(where: {slug: $slug}, locales: $locales) {
        title
        publishedDate
        coverImage {
          url
        }
        content {
          html
        }
      }
    }
  `;
  try {
    const { post } = await fetchHygraph<{ post: Post }>(query, { slug }, [locale, 'en']);
    return post;
  } catch (error) {
    console.error("Failed to fetch post", error);
    return null;
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const postEs = await getPostBySlug(slug, 'es');
  const postEn = await getPostBySlug(slug, 'en');

  if (!postEs && !postEn) {
      return notFound();
  }

  const basePost = postEn || postEs;
  if (!basePost) return notFound();


  const initialPostData = {
    es: postEs,
    en: postEn,
  };

  return <BlogPostContent initialPostData={initialPostData} slug={slug} />;
}