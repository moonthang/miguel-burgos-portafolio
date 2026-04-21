"use client"

import { fetchHygraph } from '@/lib/hygraph';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useTranslation } from '@/components/dev-portfolio';

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

interface BlogPostContentProps {
  slug: string;
  initialPostData: {
    es: Post | null;
    en: Post | null;
  };
}


export default function BlogPostContent({ slug, initialPostData }: BlogPostContentProps) {
  const { t, language } = useTranslation();
  const [post, setPost] = useState<Post | null>(language === 'es' ? initialPostData.es : initialPostData.en);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const postData = language === 'es' ? initialPostData.es : initialPostData.en;
    
    setPost(postData || initialPostData.en || initialPostData.es);

  }, [language, initialPostData]);


  if (loading) {
      return (
          <Card className="overflow-hidden shadow-lg flex items-center justify-center min-h-[500px]">
              <LoadingSpinner />
          </Card>
      );
  }

  if (!post) {
    return (
      <Card className="overflow-hidden shadow-lg p-6">
          <h1 className="text-2xl font-bold text-center">Post not found</h1>
          <p className="text-center text-muted-foreground mt-2">
            This post might not be available in your selected language.
          </p>
          <div className="mt-6 text-center">
             <Button variant="outline" asChild>
                <Link href="/blog">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Blog
                </Link>
            </Button>
          </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden shadow-lg">
      <CardContent className="p-6">
        <div className="mb-6">
          <Button variant="outline" size="icon" asChild className="rounded-full hover:border-primary hover:text-primary">
              <Link href="/blog">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="sr-only">Volver al blog</span>
              </Link>
          </Button>
        </div>

        <div className="space-y-2 mb-6">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(post.publishedDate).toLocaleDateString(t('localeCode'), {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'UTC'
                })}
            </p>
        </div>

        <div className="relative h-96 w-full mb-6">
            <Image
            src={post.coverImage.url}
            alt={post.title}
            fill
            style={{objectFit: 'cover'}}
            priority
            className="rounded-lg"
            data-ai-hint="blog post cover"
            />
        </div>
        
        <div
            className="prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content.html }}
        />
      </CardContent>
    </Card>
  );
}