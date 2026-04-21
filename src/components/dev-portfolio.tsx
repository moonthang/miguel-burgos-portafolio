"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Award,
  Album,
  FolderGit2,
  Copyright,
  Download,
  Home,
  Menu,
  Moon,
  PenTool,
  Search,
  User,
  MessageCircle,
  Sun,
  Languages,
  Sparkles,
  Wrench,
  AlertCircle,
  Code2,
  Mail,
  MessageCircleMore
} from "lucide-react";
import es from '@/locales/es.json';
import en from '@/locales/en.json';
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "next-themes";

const translations: Record<string, any> = { es, en };

const LanguageContext = createContext<{
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, options?: any) => string;
}>({
  language: 'es',
  setLanguage: () => {},
  t: (key: string) => {
    const keys = key.split('.');
    let result = translations['es'];
    for (const k of keys) {
        result = result?.[k];
        if (result === undefined) return key;
    }
    return result || key;
  },
});

export const useTranslation = () => useContext(LanguageContext);

const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState('es');
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const storedLang = localStorage.getItem('language');
        if (storedLang && (storedLang === 'es' || storedLang === 'en')) {
          setLanguage(storedLang);
        }
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            document.documentElement.lang = language;
        }
    }, [language, isMounted]);

    const t = (key: string, options: any = {}) => {
        const lang = options.lng || language;
        const keys = key.split('.');
        let result = translations[lang];
        for (const k of keys) {
            result = result?.[k];
            if (result === undefined) return key;
        }
        return result || key;
    };

    const value = {
        language,
        setLanguage: (lang: string) => {
            localStorage.setItem('language', lang);
            setLanguage(lang);
        },
        t,
    };
    
    if (!isMounted) {
        return null;
    }

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

const navItems = [
  { id: "home", href: "/" },
  { id: "about", href: "/about" },
  { id: "certifications", href: "/certifications" },
  { id: "projects", href: "/projects" },
  { id: "blog", href: "/blog" },
];

const getIcon = (id: string) => {
  switch (id) {
    case 'home': return Home;
    case 'about': return User;
    case 'certifications': return Award;
    case 'projects': return FolderGit2;
    case 'blog': return Album;
    default: return Home;
  }
}

const SidebarFooter = () => {
    const { t, setLanguage } = useTranslation();
    const { theme, setTheme } = useTheme();
    const isMobile = useIsMobile();

    const toggleTheme = () => {
      setTheme(theme === 'light' ? 'dark' : 'light');
    };
    
    const ThemeToggleIcon = () => (
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ opacity: 0, rotate: -30 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 30 }}
          transition={{ duration: 0.2 }}
        >
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </motion.div>
      </AnimatePresence>
    );

    const copyrightButton = (
        <Button variant="ghost" size="icon">
            <Copyright className="h-5 w-5" />
        </Button>
    );

    return (
        <TooltipProvider>
            <div className="mt-auto p-4 flex flex-col items-center gap-2">
                <div className="flex justify-center gap-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={toggleTheme}>
                                <ThemeToggleIcon />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{t('sidebar.darkMode')}</p>
                        </TooltipContent>
                    </Tooltip>
                    
                    <DropdownMenu>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <Languages className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{t('sidebar.languageTooltip')}</p>
                            </TooltipContent>
                        </Tooltip>
                        <DropdownMenuContent>
                            <DropdownMenuItem onSelect={() => setLanguage('es')}>Español</DropdownMenuItem>
                            <DropdownMenuItem onSelect={() => setLanguage('en')}>English</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                     <Tooltip>
                        <TooltipTrigger asChild>
                          {isMobile ? (
                            <div tabIndex={-1} role="button">{copyrightButton}</div>
                          ) : (
                            copyrightButton
                          )}
                        </TooltipTrigger>
                        <TooltipContent className="max-w-[180px] text-center">
                             <p>{t('sidebar.footer.copyright')}</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </TooltipProvider>
    );
}

const SidebarContent = () => {
    const { t, language } = useTranslation();
    const pathname = usePathname();

    const cvLinks = {
        en: 'https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/cmoac8ntoexuo07n35xthcka3',
        es: 'https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/cmoac8nyiexuv07n3g2x2mcfy',
    };

    const cvLink = language === 'en' ? cvLinks.en : cvLinks.es;

    return (
        <Card className="p-4 shadow-lg flex flex-col h-full bg-card">
            <div className="flex flex-col items-center text-center">
                <div className="relative">
                    <Avatar className="w-24 h-22 mb-4 border-2 border-background">
                        <AvatarImage src="https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/cmddp8relf7e307lutrpdu19d" alt="Miguel Burgos" data-ai-hint="developer portrait" />
                        <AvatarFallback>{t('aboutPage.initials')}</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-4 right-0 h-5 w-5 rounded-full bg-green-500 border-2 border-card shadow-lg shadow-green-500/50"></div>
                </div>
                <h1 className="text-base font-bold">Miguel Burgos</h1>
                <p className="text-xs text-muted-foreground mb-4">{t('sidebar.role')}</p>
                <a href={cvLink} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        {t('sidebar.resume')}
                    </Button>
                </a>
            </div>
            
            <nav className="flex flex-col gap-1 mt-4">
                {navItems.map((item) => {
                    const Icon = getIcon(item.id);
                    const isActive = item.href === '/' ? pathname === item.href : pathname.startsWith(item.href);
                    return (
                        <Button
                            key={item.id}
                            variant="ghost"
                            className={cn(
                                "justify-start gap-3 px-3",
                                isActive && "bg-accent text-accent-foreground dark:bg-secondary dark:text-primary"
                            )}
                            asChild
                        >
                            <a href={item.href}>
                                <Icon className={cn("h-5 w-5")} />
                                <span>{t(`nav.${item.id}`)}</span>
                            </a>
                        </Button>
                    )}
                )}
            </nav>

            <SidebarFooter />
        </Card>
    );
}

export const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
);
export const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.405 6.025-4.166 5.995 0v8.399h4.988v-10.131c0-7.88-8.922-7.88-11.004-3.715v-2.154z"/></svg>
);

export const skills = [
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "C#", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg" },
    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
    { name: "WordPress", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" },
    { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
];

export const skills2 = [
    { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
    { name: "Premiere Pro", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/premierepro/premierepro-plain.svg" },
    { name: "Blender", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" },
    { name: "After Effects", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-plain.svg" },
    { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "TailwindCSS", icon: "https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/cmdg3vhvh8la507k89xe1krxc" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Spring", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
];

const RightSidebarContent = () => {
    const { t } = useTranslation();
    const myEmail = 'masbmiguelburgos@gmail.com';
    const whatsappNumber = '57311844702';
    
    const skillsRow1 = [...skills, ...skills];
    const skillsRow2 = [...skills2, ...skills2];
    
    const expertiseItems = [
        { titleKey: "webDevelopment", icon: Code2, color: "text-purple-500 bg-purple-100 dark:bg-purple-900/20" },
        { titleKey: "graphicDesign", icon: PenTool, color: "text-orange-500 bg-orange-100 dark:bg-orange-900/20" },
        { titleKey: "digitalMarketing", icon: Search, color: "text-cyan-500 bg-cyan-100 dark:bg-cyan-900/20" },
        { titleKey: "uiUxDesign", icon: AlertCircle, color: "text-blue-500 bg-blue-100 dark:bg-blue-900/20" },
    ];

    return (
        <div className="space-y-6 lg:space-y-8">
            <Card className="shadow-lg overflow-hidden">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Wrench className="h-5 w-5" />
                        <span>{t('main.skillSet')}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                    <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none"></div>
                    <div className="space-y-4">
                        <div className="group flex w-max space-x-4 animate-scroll-left [animation-play-state:running] hover:[animation-play-state:paused]">
                            {skillsRow1.map((skill, index) => (
                                <div key={`${skill.name}-${index}-1`} className="flex-shrink-0 flex items-center justify-center h-20 w-20 p-2 rounded-full">
                                    <img src={skill.icon} alt={skill.name} className="h-10 w-10"/>
                                </div>
                            ))}
                        </div>
                        <div className="group flex w-max space-x-4 animate-scroll-right [animation-play-state:running] hover:[animation-play-state:paused]">
                            {skillsRow2.map((skill, index) => (
                                <div key={`${skill.name}-${index}-2`} className="flex-shrink-0 flex items-center justify-center h-20 w-20 p-2 rounded-full">
                                    <img src={skill.icon} alt={skill.name} className="h-10 w-10"/>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5" />
                        <span>{t('main.expertise')}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                        {expertiseItems.map((item, index) => (
                            <AccordionItem value={`item-${index+1}`} key={item.titleKey}>
                                <AccordionTrigger>
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-full ${item.color}`}>
                                            <item.icon className="h-5 w-5" />
                                        </div>
                                        <span className="font-semibold">{t(`main.expertiseItems.${item.titleKey}`)}</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pl-16 text-muted-foreground">
                                    {t(`main.expertiseItems.${item.titleKey}Description`)}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>
            
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MessageCircle className="h-5 w-5" />
                        <span>{t('main.getInTouch')}</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <div className="flex justify-center gap-6 mb-4">
                        <a href={`mailto:${myEmail}`} target="_blank" className="text-foreground hover:text-primary"><Mail className="w-6 h-6"/></a>
                        <a href="https://github.com/moonthang" target="_blank" className="text-foreground hover:text-primary"><GithubIcon className="w-6 h-6"/></a>
                        <a href="https://www.linkedin.com/in/miguel-ángel-sepúlveda-burgos-a87808167" target="_blank" className="text-foreground hover:text-primary"><LinkedinIcon className="w-6 h-6"/></a>
                        <a href={`https://wa.me/${whatsappNumber}`} target="_blank" className="text-foreground hover:text-primary"><MessageCircleMore className="w-6 h-6"/></a>
                    </div>
                    <p className="text-sm text-muted-foreground">{t('main.getInTouchDescription')}</p>
                </CardContent>
            </Card>
        </div>
    );
};

const DevPortfolioLayout = ({ children }: { children?: React.ReactNode }) => {
    const { t } = useTranslation();
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    
    useEffect(() => {
      const handleContextMenu = (e: MouseEvent) => {
          e.preventDefault();
      };
      document.addEventListener('contextmenu', handleContextMenu);
      return () => {
          document.removeEventListener('contextmenu', handleContextMenu);
      };
    }, []);
  
    return (
      <div className="w-full bg-background">
        <header className="lg:hidden sticky top-0 z-20 bg-background/80 backdrop-blur-sm shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SheetHeader>
                  <SheetTitle className="sr-only">{t('sidebar.navigationMenu')}</SheetTitle>
                </SheetHeader>
                 <div className="h-full">
                   <SidebarContent />
                 </div>
              </SheetContent>
            </Sheet>
            <div className="flex items-center gap-2">
                <div className="relative">
                    <Avatar className="w-8 h-8 border-2 border-primary">
                        <AvatarImage src="https://us-west-2.graphassets.com/cmdc30lgu1tuj06n2dtwpe500/output=format:jpg/cmddp8relf7e307lutrpdu19d" alt={t('aboutPage.name')} data-ai-hint="developer portrait"/>
                        <AvatarFallback>{t('aboutPage.initials')}</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-500 border border-background shadow-lg shadow-green-500/50"></div>
                </div>
              <span className="font-bold text-sm">{t('aboutPage.name')}</span>
            </div>
          </div>
        </header>
  
        <div className="container px-4 sm:px-6 lg:px-8 flex flex-row min-h-screen">
          <aside className="hidden lg:block lg:sticky top-0 h-screen lg:w-[280px] xl:w-[340px] flex-shrink-0 py-8 lg:pr-6 xl:pr-8">
            <div className="h-full">
              <SidebarContent />
            </div>
          </aside>
          
          <main className="flex-1 py-8">
             <div className="grid grid-cols-12 gap-8">
                <div className={cn(
                    "col-span-12",
                    isHomePage ? "xl:col-span-8" : "xl:col-span-12"
                )}>
                  {children}
                  {isHomePage && (
                    <div className="block xl:hidden mt-8">
                      <RightSidebarContent />
                    </div>
                  )}
                </div>
                {isHomePage && (
                  <aside className="hidden xl:block col-span-4">
                     <div className="sticky top-8">
                        <RightSidebarContent />
                     </div>
                  </aside>
                )}
              </div>
          </main>
        </div>
      </div>
    );
}

export default function DevPortfolio({ children }: { children?: React.ReactNode }) {
    return (
        <LanguageProvider>
            <TooltipProvider>
                <DevPortfolioLayout>{children}</DevPortfolioLayout>
            </TooltipProvider>
        </LanguageProvider>
    )
}