"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation, skills, skills2 } from "@/components/dev-portfolio";
import { allCertificates } from "@/app/certifications/page";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import {
    Calendar,
    Award,
    FolderGit2,
    Code2,
    ChartLine,
    Bookmark,
    Sparkles,
    PenTool,
    Search,
  } from "lucide-react";
import AnimatedCounter from "@/components/ui/animated-counter";
import { fetchHygraph } from "@/lib/hygraph";
import Typewriter from "@/components/ui/typewriter";
import { Skeleton } from "@/components/ui/skeleton";
import { projectsData } from "@/lib/projects-data";

interface Post {
    slug: string;
    title: string;
    publishedDate: string;
    coverImage: {
      url: string;
    } | null;
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


const MainContent = () => {
    const { t, language } = useTranslation();
    const [currentDate, setCurrentDate] = useState("");
    const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
    const [loadingPosts, setLoadingPosts] = useState(true);
    
    const welcomePhrases = React.useMemo(() => [
        t('main.welcome'), 
        t('main.welcome2'), 
        t('main.welcome3'),
        t('main.welcome4')
    ], [t]);

    useEffect(() => {
        setLoadingPosts(true);
        const locale = language === 'es' ? 'es' : 'en';
        getRecentPosts(locale).then(posts => {
            setFeaturedPosts(posts);
            setLoadingPosts(false);
        }).catch(console.error);
    }, [language]);

    const certificatesCount = allCertificates.length;
    const technologiesCount = skills.length + skills2.length;
    const startYear = 2022;
    const currentYear = new Date().getFullYear();
    const yearsOfExperience = currentYear - startYear;
    const projectsCount = Object.values(projectsData).reduce((acc, category) => acc + category.length, 0);

    const careerStats = [
        { labelKey: "experience", value: yearsOfExperience, unitKey: "experienceYears", icon: Calendar, color: "text-purple-600 bg-gradient-to-br from-purple-100 to-purple-300 dark:from-purple-900/50 dark:to-purple-900/80" },
        { labelKey: "certificates", value: certificatesCount, icon: Award, color: "text-orange-600 bg-gradient-to-br from-orange-100 to-orange-300 dark:from-orange-900/50 dark:to-orange-900/80" },
        { labelKey: "projects", value: projectsCount, icon: FolderGit2, color: "text-cyan-600 bg-gradient-to-br from-cyan-100 to-cyan-300 dark:from-cyan-900/50 dark:to-cyan-900/80" },
        { labelKey: "technologies", value: technologiesCount, icon: Code2, color: "text-blue-600 bg-gradient-to-br from-blue-100 to-blue-300 dark:from-blue-900/50 dark:to-blue-900/80" },
    ];
    
    const serviceItems = [
        { titleKey: "webDevelopment", icon: Code2, descriptionKey: "webDevelopmentServiceDescription" },
        { titleKey: "graphicDesign", icon: PenTool, descriptionKey: "graphicDesignServiceDescription" },
        { titleKey: "digitalMarketing", icon: Search, descriptionKey: "digitalMarketingServiceDescription" },
    ];
      
    useEffect(() => {
        const date = new Date();
        const options: Intl.DateTimeFormatOptions = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
        setCurrentDate(new Intl.DateTimeFormat(t('localeCode'), options).format(date));
    }, [t]);
    
    const truncateText = (text: string, wordLimit: number) => {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    };

    return (
        <div className="grid grid-cols-1 gap-6 lg:gap-8">
            <Card className="overflow-hidden shadow-lg">
            <div className="relative h-[251px] w-full">
                <Image src="https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/cmddor1geedll07lj0zeb0wja" alt="VR experience" fill style={{objectFit: 'cover', objectPosition: 'top'}} data-ai-hint="virtual reality future" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute top-4 left-4 text-white text-sm flex items-center gap-2 bg-black/30 p-2 rounded-lg">
                    <Calendar className="h-4 w-4" />
                    <span>{currentDate}</span>
                </div>
                <div className="absolute bottom-4 left-4 w-[calc(100%-2rem)]">
                    <h2 className="text-2xl md:text-3xl font-bold text-white h-16 md:h-auto">
                        <Typewriter texts={welcomePhrases} />
                    </h2>
                </div>
            </div>
            </Card>

            <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <ChartLine className="h-5 w-5" />
                    <span>{t('main.careerStats')}</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {careerStats.map((stat) => (
                    <div key={stat.labelKey} className="flex flex-col items-start text-left p-4 rounded-lg bg-card border transition-colors hover:bg-accent">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full ${stat.color}`}>
                                <stat.icon className="h-6 w-6" />
                            </div>
                            <p className="text-2xl font-bold flex items-baseline gap-1.5">
                                <AnimatedCounter value={stat.value} />
                                {stat.unitKey && <span className="text-sm font-medium text-muted-foreground">{t(`main.careerStatItems.${stat.unitKey}`)}</span>}
                            </p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{t(`main.careerStatItems.${stat.labelKey}`)}</p>
                    </div>
                ))}
                </div>
            </CardContent>
            </Card>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        <span>{t('main.services.title')}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {serviceItems.map((item) => (
                            <Card key={item.titleKey} className="bg-background/50 dark:bg-card/50 p-4 rounded-lg text-center flex flex-col items-center">
                                <item.icon className="h-8 w-8 mb-4 text-primary" />
                                <h3 className="font-semibold mb-2">{t(`main.services.${item.titleKey}`)}</h3>
                                <p className="text-xs text-muted-foreground">{t(`main.services.${item.descriptionKey}`)}</p>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bookmark className="h-5 w-5" />
                        <span>{t('main.featured')}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {loadingPosts ? (
                        Array.from({ length: 3 }).map((_, i) => (
                            <Card key={i} className="overflow-hidden group flex flex-col">
                                <Skeleton className="aspect-video w-full" />
                                <CardContent className="p-4 flex flex-col flex-grow">
                                    <Skeleton className="h-5 w-4/5 mb-2" />
                                    <Skeleton className="h-4 w-full mb-4" />
                                    <Skeleton className="h-4 w-3/4 mb-4" />
                                    <Skeleton className="h-4 w-1/2 mt-auto" />
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        featuredPosts.map((item) => (
                            <Card key={item.slug} className="overflow-hidden group flex flex-col h-full">
                                <Link href={`/blog/${item.slug}`} className="block">
                                    <div className="relative aspect-video bg-muted">
                                        {item.coverImage?.url && (
                                            <Image 
                                                src={item.coverImage.url} 
                                                alt={item.title} 
                                                fill
                                                style={{objectFit: 'cover'}}
                                                className="transition-transform duration-300" 
                                                data-ai-hint="blog post cover"
                                            />
                                        )}
                                    </div>
                                </Link>
                                <CardContent className="p-4 flex flex-col flex-grow">
                                    <div className="flex-grow">
                                        <h3 className="font-semibold mb-2">
                                            <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                                        </h3>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            {truncateText(item.content.text, 20)}
                                        </p>
                                    </div>
                                    <p className="text-xs text-muted-foreground flex items-center gap-2 mt-auto">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(item.publishedDate).toLocaleDateString(t('localeCode'), {
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
    )
}

export default MainContent;