"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/components/dev-portfolio";
import { Album, Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import { fetchHygraph } from "@/lib/hygraph";
import { useEffect, useState, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

interface Post {
  slug: string;
  title: string;
  publishedDate: string;
  coverImage: {
    url: string;
  };
  content: {
    text: string;
  }
}

async function getBlogPosts(locale: string): Promise<Post[]> {
  const query = `
    query GetPosts($locales: [Locale!]!) {
      posts(orderBy: publishedDate_DESC, locales: $locales) {
        slug
        title
        publishedDate
        coverImage {
          url
        }
        content {
            text
        }
      }
    }
  `;
  const { posts } = await fetchHygraph<{ posts: Post[] }>(query, {}, [locale, 'en']);
  return posts;
}

const POSTS_PER_PAGE = 9;

export default function BlogPage() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, language } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    const locale = language === 'es' ? 'es' : 'en';
    getBlogPosts(locale).then(posts => {
      setAllPosts(posts);
      setLoading(false);
      setCurrentPage(1);
    });
  }, [language]);
  
  const featuredPost = useMemo(() => allPosts.length > 0 ? allPosts[0] : null, [allPosts]);
  const remainingPosts = useMemo(() => allPosts.length > 1 ? allPosts.slice(1) : [], [allPosts]);

  const { paginatedPosts, totalPages } = useMemo(() => {
    const total = remainingPosts.length;
    const pages = Math.ceil(total / POSTS_PER_PAGE);
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    
    return { 
      paginatedPosts: remainingPosts.slice(startIndex, endIndex),
      totalPages: pages 
    };
  }, [remainingPosts, currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
    const truncateText = (text: string, wordLimit: number) => {
        if (!text) return '';
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    };


  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold">
            <Album className="w-6 h-6" />
            {t('blogPage.title')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
            {loading ? (
                <div className="space-y-8">
                    <Skeleton className="h-[350px] w-full" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Array.from({ length: 3 }).map((_, i) => (
                           <Card key={i} className="overflow-hidden group flex flex-col">
                             <Skeleton className="aspect-video w-full" />
                             <CardContent className="p-4 flex flex-col flex-grow">
                               <Skeleton className="h-5 w-4/5 mb-2" />
                               <Skeleton className="h-4 w-1/2" />
                             </CardContent>
                           </Card>
                        ))}
                    </div>
                </div>
            ) : featuredPost && (
                <div className="space-y-8">
                    <Link href={`/blog/${featuredPost.slug}`} className="block">
                      <Card className="overflow-hidden group relative shadow-lg transition-all duration-300 hover:shadow-xl h-[350px]">
                        <Image
                          src={featuredPost.coverImage.url}
                          alt={featuredPost.title}
                          fill
                          style={{objectFit: 'cover'}}
                          className="transition-transform duration-300"
                          data-ai-hint="blog post cover"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-6 text-white">
                            <h3 className="text-2xl font-bold mb-2 drop-shadow-md">
                                {featuredPost.title}
                            </h3>
                            <p className="text-sm text-white/90 flex items-center gap-2 drop-shadow-sm">
                                <Calendar className="h-4 w-4" />
                                {new Date(featuredPost.publishedDate).toLocaleDateString(t('localeCode'), {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                    timeZone: 'UTC'
                                })}
                            </p>
                        </div>
                      </Card>
                    </Link>
                    
                    {paginatedPosts.length > 0 && <div className="border-t pt-8" />}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {paginatedPosts.map((post) => (
                        <Card key={post.slug} className="overflow-hidden group flex flex-col">
                          <Link href={`/blog/${post.slug}`} className="block">
                            <div className="relative aspect-video bg-muted">
                              <Image
                                src={post.coverImage.url}
                                alt={post.title}
                                fill
                                style={{objectFit: 'cover'}}
                                className="transition-transform duration-300"
                                data-ai-hint="blog post cover"
                              />
                            </div>
                          </Link>
                          <CardContent className="p-4 flex flex-col flex-grow">
                            <div className="flex-grow">
                              <h3 className="font-semibold mb-2">
                                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                              </h3>
                              <p className="text-xs text-muted-foreground flex items-center gap-2">
                                <Calendar className="h-3 w-3" />
                                {new Date(post.publishedDate).toLocaleDateString(t('localeCode'), {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                  timeZone: 'UTC'
                                })}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {totalPages > 1 && (
                      <div className="flex justify-center items-center gap-4 pt-6 border-t">
                        <Button 
                          variant="outline" 
                          onClick={handlePreviousPage} 
                          disabled={currentPage === 1}
                        >
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          {t('blogPage.previous')}
                        </Button>
                        <span className="text-sm text-muted-foreground">
                          {t('blogPage.page', { currentPage, totalPages })}
                        </span>
                        <Button 
                          variant="outline" 
                          onClick={handleNextPage} 
                          disabled={currentPage === totalPages}
                        >
                          {t('blogPage.next')}
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    )}
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}