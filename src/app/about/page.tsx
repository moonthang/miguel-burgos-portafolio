"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Briefcase,
  Calendar,
  GraduationCap,
  Award,
  Bookmark,
  User,
  ExternalLink,
  MessageCircle,
  Mail,
  MessageCircleMore
} from "lucide-react";
import { useTranslation, GithubIcon, LinkedinIcon } from "@/components/dev-portfolio";
import { allCertificates } from "@/app/certifications/page";
import { fetchHygraph } from "@/lib/hygraph";
import { Skeleton } from "@/components/ui/skeleton";
import { ContactForm } from "@/components/contact-form";
import { parseDate } from "@/lib/utils";


interface Post {
    slug: string;
    title: string;
    publishedDate: string;
    coverImage: {
      url: string;
    };
    content: {
      text: string;
    };
}

async function getRecentPosts(locale: string): Promise<Post[]> {
    const query = `
      query GetRecentPosts($locales: [Locale!]!) {
        posts(first: 3, orderBy: publishedDate_DESC, locales: $locales) {
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

const ExpandableText = ({ text, shortText }: { text: string; shortText: string; }) => {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);

    if (!text) return null;

    const needsTruncation = text.length > shortText.length;
    const isList = text.includes('||');
    const listItems = isList ? text.split('||').map(item => item.trim()) : [];

    return (
      <div className="text-sm text-muted-foreground mt-2">
        {isExpanded || !needsTruncation ? (
          isList ? (
            <ul className="list-disc pl-5 space-y-1">
              {listItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : (
            <p>{text}</p>
          )
        ) : (
          <p>{`${shortText}...`}</p>
        )}
        {needsTruncation && (
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-primary hover:underline ml-1 font-semibold"
            >
                {isExpanded ? t('aboutPage.seeLess') : t('aboutPage.seeMore')}
            </button>
        )}
      </div>
    );
};

export default function AboutPage() {
    const { t, language } = useTranslation();
    const plugin = useRef(
      Autoplay({ delay: 5000, stopOnInteraction: true })
    )
    const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
    const [loadingPosts, setLoadingPosts] = useState(true);

    useEffect(() => {
        setLoadingPosts(true);
        const locale = language === 'es' ? 'es' : 'en';
        getRecentPosts(locale).then(posts => {
            setFeaturedPosts(posts);
            setLoadingPosts(false);
        }).catch(console.error);
    }, [language]);

    const myEmail = 'masbmiguelburgos@gmail.com';
    const whatsappNumber = '57311844702';

    const carouselImages = [
      "https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/cmddor1hreml407lu19t4mpu7",
      "https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/cmddor1geedll07lj0zeb0wja",
      "https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/cmddor1gcedli07ljee3fultg",
      "https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/cmddor1g9emky07lucxfewvi8"
    ];

    const recentCertificates = useMemo(() => {
        const lang = language as 'es' | 'en';
        const sorted = [...allCertificates].sort((a, b) => {
            const dateA = parseDate(a.dateKey, lang, t);
            const dateB = parseDate(b.dateKey, lang, t);
            return dateB.getTime() - dateA.getTime();
        });
        return sorted.slice(0, 4);
    }, [t, language]);

    const truncateText = (text: string, wordLimit: number) => {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    };


    return (
        <div className="space-y-6">
            <Card className="overflow-hidden shadow-lg relative">
                <Carousel
                    plugins={[plugin.current]}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {carouselImages.map((src, index) => (
                        <CarouselItem key={index}>
                            <div className="relative h-[300px] w-full">
                                <Image
                                    src={src}
                                    alt={`${t('aboutPage.headerAlt')} ${index + 1}`}
                                    fill
                                    style={{objectFit: 'cover', objectPosition: 'top'}}
                                    data-ai-hint="abstract network"
                                    priority={index === 0}
                                />
                            </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                     <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex flex-col sm:flex-row sm:items-end sm:gap-6 text-white">
                            <div className="flex-grow">
                                <h1 className="text-3xl font-bold drop-shadow-md">{t('aboutPage.name')}</h1>
                                <p className="text-lg text-white/90 drop-shadow-sm">{t('aboutPage.role')}</p>
                            </div>
                            <div className="mt-4 sm:mt-0 w-full sm:w-auto">
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6 flex flex-col h-full">
                    <Card className="shadow-lg">
                        <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2">
                            <User className="w-5 h-5" />
                            <span>{t('aboutPage.aboutTitle')}</span>
                        </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mt-2">
                                {t('aboutPage.fullAboutText')}
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="shadow-lg flex flex-col flex-grow">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bookmark className="w-5 h-5" />
                                <span>{t('main.featured')}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
                            {loadingPosts ? (
                                Array.from({ length: 3 }).map((_, i) => (
                                    <Card key={i} className="overflow-hidden group flex flex-col">
                                        <Skeleton className="aspect-video w-full" />
                                        <CardContent className="p-4 flex flex-col flex-grow">
                                            <Skeleton className="h-5 w-4/5 mb-2" />
                                            <Skeleton className="h-4 w-full mb-4" />
                                            <Skeleton className="h-4 w-1/2 mt-auto" />
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                featuredPosts.map((post) => (
                                    <Card key={post.slug} className="overflow-hidden group flex flex-col h-full">
                                        <Link href={`/blog/${post.slug}`} className="block">
                                            <div className="relative aspect-video">
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
                                                <h3 className="font-semibold mb-2 hover:text-primary transition-colors">
                                                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                                </h3>
                                                <p className="text-sm text-muted-foreground mb-4">
                                                    {truncateText(post.content.text, 15)}
                                                </p>
                                            </div>
                                            <p className="text-xs text-muted-foreground flex items-center gap-2 mt-auto">
                                                <Calendar className="h-3 w-3" />
                                                {new Date(post.publishedDate).toLocaleDateString(t('localeCode'), {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    timeZone: 'UTC'
                                                })}
                                            </p>
                                        </CardContent>
                                    </Card>
                                ))
                            )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-1">
                    <Card className="shadow-lg h-full">
                        <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Award className="w-5 h-5" />
                            <span>{t('main.careerStatItems.certificates')}</span>
                        </CardTitle>
                        </CardHeader>
                        <CardContent>
                        <ul className="space-y-4">
                            {recentCertificates.map((cert, index) => {
                                const link = cert.link === '#' ? cert.certImage : cert.link;
                                return (
                                <li key={index} className="flex items-center gap-4">
                                    {cert.icon}
                                    <div className="flex-grow">
                                        <p className="font-semibold text-sm line-clamp-1">{t(cert.titleKey)}</p>
                                        <p className="text-xs text-muted-foreground">{t(cert.issuerKey)}</p>
                                        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1"><Calendar className="w-3 h-3" /> {t(cert.dateKey)}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" asChild>
                                        <Link href={link || '#'} target="_blank">
                                            <ExternalLink className="w-4 h-4" />
                                        </Link>
                                    </Button>
                                </li>
                            )})}
                        </ul>
                        <div className="mt-6 border-t pt-4 text-center">
                            <Link href="/certifications" className="text-sm font-medium text-primary rounded-md p-2 hover:bg-accent flex items-center justify-center gap-2 transition-colors">
                                <ExternalLink className="w-4 h-4" />
                                {t('aboutPage.showAllCertificates')}
                            </Link>
                        </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
                <Card className="shadow-lg">
                    <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="w-5 h-5" />
                        <span>{t('aboutPage.education.title')}</span>
                    </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="relative w-10 h-10 flex-shrink-0">
                                    <Image src="https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/resize=width:48,height:48,fit:crop/cmddjq3de0w9w07ljlzjrpsb4" alt={t('aboutPage.education.institution')} fill style={{objectFit: 'contain'}} data-ai-hint="university logo" />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold">{t('aboutPage.education.degree')}</p>
                                    <p className="text-sm text-muted-foreground">{t('aboutPage.education.institution')}</p>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1"><Calendar className="w-3 h-3" /> {t('aboutPage.education.date')}</p>
                                    <ExpandableText
                                        text={t('aboutPage.education.fullDescription')}
                                        shortText={t('aboutPage.education.shortDescription')}
                                    />
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="relative w-10 h-10 flex-shrink-0">
                                    <Image src="https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/resize=width:48,height:48,fit:crop/cmddjtoih1jm107ljjxj2zqef" alt={t('aboutPage.education2.institution')} fill style={{objectFit: 'contain'}} data-ai-hint="institute logo" />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold">{t('aboutPage.education2.degree')}</p>
                                    <p className="text-sm text-muted-foreground">{t('aboutPage.education2.institution')}</p>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1"><Calendar className="w-3 h-3" /> {t('aboutPage.education2.date')}</p>
                                    <ExpandableText
                                        text={t('aboutPage.education2.fullDescription')}
                                        shortText={t('aboutPage.education2.shortDescription')}
                                    />
                                </div>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Briefcase className="w-5 h-5" />
                            <span>{t('aboutPage.experience.title')}</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                 <Image src="https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/resize=width:164,height:164,fit:crop/cmdrlexvmhz0t07n5p35hpydk" alt="Todo a un Click logo" width={40} height={40} className="rounded-md" data-ai-hint="company logo" />
                                <div className="flex-grow">
                                    <p className="font-semibold">{t('aboutPage.experience.role_dev')}</p>
                                    <p className="text-sm text-muted-foreground">{t('aboutPage.experience.company_dev')}</p>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1"><Calendar className="w-3 h-3" /> {t('aboutPage.experience.date_dev')}</p>
                                    <ExpandableText
                                        text={t('aboutPage.experience.fullDescription_dev')}
                                        shortText={t('aboutPage.experience.shortDescription_dev')}
                                    />
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                 <Image src="https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/resize=width:164,height:164,fit:crop/cmdrlexvmhz0t07n5p35hpydk" alt="Todo a un Click logo" width={40} height={40} className="rounded-md" data-ai-hint="company logo" />
                                <div className="flex-grow">
                                    <p className="font-semibold">{t('aboutPage.experience.role_commercial')}</p>
                                    <p className="text-sm text-muted-foreground">{t('aboutPage.experience.company_commercial')}</p>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1"><Calendar className="w-3 h-3" /> {t('aboutPage.experience.date_commercial')}</p>
                                    <ExpandableText
                                        text={t('aboutPage.experience.fullDescription_commercial')}
                                        shortText={t('aboutPage.experience.shortDescription_commercial')}
                                    />
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                 <Image src="https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/resize=width:164,height:164,fit:crop/cmdrlexushzrj07n2b4g27k1h" alt="Nexarte logo" width={40} height={40} className="rounded-md" data-ai-hint="company logo" />
                                <div className="flex-grow">
                                    <p className="font-semibold">{t('aboutPage.experience.role_intern')}</p>
                                    <p className="text-sm text-muted-foreground">{t('aboutPage.experience.company_intern')}</p>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-1"><Calendar className="w-3 h-3" /> {t('aboutPage.experience.date_intern')}</p>
                                    <ExpandableText
                                        text={t('aboutPage.experience.fullDescription_intern')}
                                        shortText={t('aboutPage.experience.shortDescription_intern')}
                                    />
                                </div>
                            </li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageCircle className="h-5 w-5" />
                        <span>{t('main.getInTouch')}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <div className="flex justify-center gap-6 mb-4">
                        <a href={`mailto:${myEmail}`} target="_blank" className="text-foreground hover:text-primary transition-colors"><Mail className="w-6 h-6"/></a>
                        <a href="https://github.com/moonthang" target="_blank" className="text-foreground hover:text-primary transition-colors"><GithubIcon className="w-6 h-6"/></a>
                        <a href="https://www.linkedin.com/in/miguel-ángel-sepúlveda-burgos-a87808167" target="_blank" className="text-foreground hover:text-primary transition-colors"><LinkedinIcon className="w-6 h-6"/></a>
                        <a href={`https://wa.me/${whatsappNumber}`} target="_blank" className="text-foreground hover:text-primary transition-colors"><MessageCircleMore className="w-6 h-6"/></a>
                    </div>
                    <p className="text-sm text-muted-foreground">{t('main.getInTouchDescription')}</p>
                </CardContent>
            </Card>
        </div>
    );
}
