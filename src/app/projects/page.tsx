"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedTabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Laptop, Code, FolderGit2, Expand, Video } from "lucide-react";
import { useTranslation, GithubIcon } from "@/components/dev-portfolio";
import { Badge } from "@/components/ui/badge";
import { ProjectGalleryModal } from "@/components/project-gallery-modal";
import { ProjectVideoModal } from "@/components/project-video-modal";
import { cn } from "@/lib/utils";
import { ExpandableText } from "@/components/ui/expandable-text";
import { ProjectFigmaModal } from "@/components/project-figma-modal";
import { projectsData } from "@/lib/projects-data";

const ProjectCard = ({ project, type }: { project: any, type: string }) => {
    const { t } = useTranslation();
    const [showAllTechs, setShowAllTechs] = useState(false);
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const [isFigmaOpen, setIsFigmaOpen] = useState(false);
    
    const techsToShow = project.technologies ? (showAllTechs ? project.technologies : project.technologies.slice(0, 4)) : [];
    const hasMoreTechs = project.technologies && project.technologies.length > 4;

    const handleCardClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('a, button')) {
            return;
        }
        if (project.imageUrls) {
            setIsGalleryOpen(true);
        }
    };

    const isYuweLongo = project.titleKey === "projects.web.yuwelongo.title";
    
    return (
        <>
            <Card 
                onClick={handleCardClick}
                className={cn(
                    "overflow-hidden group grid md:grid-cols-2 shadow-lg transition-all duration-300 hover:shadow-xl",
                    project.imageUrls && "cursor-pointer"
                )}
            >
              <div className="relative aspect-video md:aspect-auto">
                <Image
                  src={project.imageUrl}
                  alt={t(project.titleKey)}
                  fill
                  style={{objectFit: 'cover'}}
                  className="transition-transform duration-300 md:rounded-l-lg md:rounded-r-none"
                  data-ai-hint={project.imageHint}
                />
                {project.imageUrls && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="flex items-center gap-2 text-white font-semibold bg-black/50 p-2 rounded-md">
                            <Expand className="w-4 h-4" />
                            <span>{t('projectsPage.viewGallery')}</span>
                        </div>
                    </div>
                )}
              </div>
              <div className="flex flex-col p-6 h-full">
                    <h3 className="text-xl font-bold mb-2">{t(project.titleKey)}</h3>
                    
                    <ExpandableText text={t(project.descriptionKey)} wordLimit={25} />
                    
                    {project.technologies && project.technologies.length > 0 && (
                        <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                            <Code className="w-4 h-4" />
                            {t('projectsPage.technologies')}
                        </h4>
                        <div className="flex flex-wrap gap-2 items-center">
                            {techsToShow.map((tech: any) => (
                                <Badge key={tech.name} variant="secondary" className="flex items-center gap-1.5 py-1 px-2">
                                    <img src={tech.icon} alt={tech.name} className="w-3.5 h-3.5"/>
                                    {tech.name}
                                </Badge>
                            ))}
                            {hasMoreTechs && !showAllTechs && (
                              <Button variant="ghost" size="sm" className="h-auto p-1 text-xs" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowAllTechs(true); }}>
                                  ...
                              </Button>
                            )}
                        </div>
                        </div>
                    )}
                    
                    <div className={cn(
                        "flex gap-2 mt-auto",
                        isYuweLongo ? "flex-col" : "flex-row"
                    )}>
                        {project.repoLink && !project.backendRepoLink && (
                            <Button asChild variant="outline" className="flex-1">
                                <Link href={project.repoLink} target="_blank" onClick={e => e.stopPropagation()}>
                                <GithubIcon className="mr-2 h-4 w-4" />
                                {t('projectsPage.repository')}
                                </Link>
                            </Button>
                        )}
                         {project.repoLink && project.backendRepoLink && (
                            <Button asChild variant="outline" className="flex-1">
                                <Link href={project.repoLink} target="_blank" onClick={e => e.stopPropagation()}>
                                <GithubIcon className="mr-2 h-4 w-4" />
                                {t('projectsPage.frontendRepository')}
                                </Link>
                            </Button>
                        )}
                        {project.backendRepoLink && (
                            <Button asChild variant="outline" className="flex-1">
                                <Link href={project.backendRepoLink} target="_blank" onClick={e => e.stopPropagation()}>
                                <GithubIcon className="mr-2 h-4 w-4" />
                                {t('projectsPage.backendRepository')}
                                </Link>
                            </Button>
                        )}
                        {project.demoLink && project.demoLink !== '#' && (
                            <Button asChild variant="outline" className="flex-1">
                            <Link href={project.demoLink} target="_blank" onClick={e => e.stopPropagation()}>
                                <Laptop className="mr-2 h-4 w-4" />
                                {t('projectsPage.demo')}
                            </Link>
                            </Button>
                        )}
                        {project.figmaEmbedUrl && (
                            <Button variant="outline" className="flex-1" onClick={(e) => { e.stopPropagation(); setIsFigmaOpen(true); }}>
                                <Laptop className="mr-2 h-4 w-4" />
                                {t('projectsPage.demo')}
                            </Button>
                        )}
                         {project.videoUrl && (
                            <Button variant="outline" className="flex-1" onClick={(e) => { e.stopPropagation(); setIsVideoOpen(true); }}>
                                <Video className="mr-2 h-4 w-4" />
                                {t('projectsPage.viewPromo')}
                            </Button>
                        )}
                    </div>
                </div>
            </Card>
            {project.imageUrls && (
                <ProjectGalleryModal 
                    isOpen={isGalleryOpen} 
                    onOpenChange={setIsGalleryOpen}
                    images={project.imageUrls}
                    title={t(project.titleKey)}
                />
            )}
             {project.videoUrl && (
                <ProjectVideoModal
                    isOpen={isVideoOpen}
                    onOpenChange={setIsVideoOpen}
                    videoUrl={project.videoUrl}
                    title={t(project.titleKey)}
                />
            )}
            {project.figmaEmbedUrl && (
                <ProjectFigmaModal
                    isOpen={isFigmaOpen}
                    onOpenChange={setIsFigmaOpen}
                    embedUrl={project.figmaEmbedUrl}
                    title={t(project.titleKey)}
                />
            )}
        </>
      );
}

export default function ProjectsPage() {
  const { t } = useTranslation();

  const tabs = [
    { id: "web", label: t('main.expertiseItems.webDevelopment') },
    { id: "mobile", label: t('projectsPage.mobileDevelopment') },
    { id: "graphic", label: t('main.expertiseItems.graphicDesign') },
    { id: "ui_ux", label: t('main.expertiseItems.uiUxDesign') },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const CurrentProjects = () => {
    const key = activeTab as keyof typeof projectsData;
    return projectsData[key] || [];
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold">
            <FolderGit2 className="w-6 h-6" />
            {t('nav.projects')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full">
            <div className="mb-6 flex justify-center">
                <AnimatedTabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
            </div>
            <div className="grid grid-cols-1 gap-6">
              {CurrentProjects().map((p, i) => (
                <ProjectCard key={i} project={p} type={activeTab} />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}