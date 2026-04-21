"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ProjectFigmaModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    embedUrl: string;
    title: string;
}

export function ProjectFigmaModal({ isOpen, onOpenChange, embedUrl, title }: ProjectFigmaModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl p-0 h-[90vh] flex flex-col">
                <DialogHeader className="p-4 border-b">
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="p-4 flex-1">
                   {embedUrl ? (
                        <iframe
                            style={{border: "1px solid rgba(0, 0, 0, 0.1)"}}
                            width="100%"
                            height="100%"
                            src={embedUrl}
                            allowFullScreen
                            className="rounded-md"
                        ></iframe>
                   ) : (
                        <div className="text-center h-full flex items-center justify-center">
                            <p>Invalid Figma URL provided.</p>
                        </div>
                   )}
                </div>
            </DialogContent>
        </Dialog>
    );
}