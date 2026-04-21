
"use client";

import { useState } from 'react';
import { useTranslation } from '@/components/dev-portfolio';

interface ExpandableTextProps {
    text: string;
    wordLimit: number;
}

const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(' ');
    }
    return text;
};

export function ExpandableText({ text, wordLimit }: ExpandableTextProps) {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState(false);
    
    const truncatedText = truncateText(text, wordLimit);
    const needsTruncation = text.length > truncatedText.length && text !== truncatedText;

    const toggleExpansion = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="text-sm text-muted-foreground flex-grow mb-4">
            <p>
                {isExpanded ? text : truncatedText}
                {needsTruncation && !isExpanded && <span>...</span>}
                {needsTruncation && (
                    <button
                        onClick={toggleExpansion}
                        className="text-primary hover:underline ml-1 font-semibold"
                    >
                        {isExpanded ? t('main.seeLess') : t('main.seeMore')}
                    </button>
                )}
            </p>
        </div>
    );
}
