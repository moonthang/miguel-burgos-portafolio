"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ProjectVideoModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    videoUrl: string;
    title: string;
}

export function ProjectVideoModal({ isOpen, onOpenChange, videoUrl, title }: ProjectVideoModalProps) {
    
    const getYouTubeEmbedUrl = (url: string) => {
        let videoId;
        if (url.includes("youtu.be/")) {
            videoId = url.split("youtu.be/")[1];
        } else if (url.includes("watch?v=")) {
            videoId = url.split("watch?v=")[1];
        } else {
            return null;
        }

        const ampersandPosition = videoId.indexOf('&');
        if (ampersandPosition !== -1) {
            videoId = videoId.substring(0, ampersandPosition);
        }
        
        return `https://www.youtube.com/embed/${videoId}`;
    }

    const embedUrl = getYouTubeEmbedUrl(videoUrl);

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl p-0">
                <DialogHeader className="p-4 border-b">
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="p-4">
                   {embedUrl ? (
                        <div className="relative aspect-video w-full">
                            <iframe
                                src={embedUrl}
                                title={title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="absolute top-0 left-0 w-full h-full rounded-md"
                            ></iframe>
                        </div>
                   ) : (
                        <div className="text-center h-96 flex items-center justify-center">
                            <p>Se ha introducido una URL de YouTube no válida.</p>
                        </div>
                   )}
                </div>
            </DialogContent>
        </Dialog>
    );
}