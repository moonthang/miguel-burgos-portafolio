"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"

interface ProjectGalleryModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    images: string[];
    title: string;
}

export function ProjectGalleryModal({ isOpen, onOpenChange, images, title }: ProjectGalleryModalProps) {
    const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl p-0">
                <DialogHeader className="p-4 border-b">
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="p-4">
                    {images.length > 0 ? (
                        <Carousel
                            plugins={[plugin.current]}
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                            className="w-full"
                            onMouseEnter={plugin.current.stop}
                            onMouseLeave={plugin.current.reset}
                        >
                            <CarouselContent>
                                {images.map((imageUrl, index) => (
                                    <CarouselItem key={index}>
                                        <div className="relative aspect-video w-full">
                                            <Image
                                                src={imageUrl}
                                                alt={`${title} - Image ${index + 1}`}
                                                fill
                                                style={{ objectFit: 'contain' }}
                                                className="rounded-md"
                                                data-ai-hint="project gallery image"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
                            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
                        </Carousel>
                    ) : (
                        <div className="text-center h-96 flex items-center justify-center">
                            <p>No se han encontrado imágenes para este proyecto.</p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}