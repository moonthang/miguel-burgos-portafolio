
"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const BlinkingCursor = () => (
  <motion.div
    initial={{ opacity: 1 }}
    animate={{ opacity: 0 }}
    exit={{ opacity: 1 }}
    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
    className="inline-block bg-white w-0.5 h-full ml-1"
    style={{ height: '1em', verticalAlign: 'bottom' }}
  />
);

interface TypewriterProps {
  text?: string;
  texts?: string[];
  delay?: number;
  pauseDuration?: number;
}

export default function Typewriter({
  text,
  texts = [],
  delay = 50,
  pauseDuration = 2000,
}: TypewriterProps) {
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const textsToAnimate = text ? [text] : texts;

  useEffect(() => {
    if (textsToAnimate.length === 0) return;

    const handleTyping = () => {
      const fullText = textsToAnimate[textIndex];

      if (isDeleting) {
        setCurrentText(fullText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);

        if (charIndex -1 === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % textsToAnimate.length);
        }
      } else {
        setCurrentText(fullText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);

        if (charIndex + 1 === fullText.length) {
          if (textsToAnimate.length > 1) {
            setTimeout(() => setIsDeleting(true), pauseDuration);
          }
        }
      }
    };

    const typingTimeout = setTimeout(handleTyping, isDeleting ? delay / 2 : delay);
    return () => clearTimeout(typingTimeout);
  }, [charIndex, textIndex, isDeleting, textsToAnimate, delay, pauseDuration]);

  return (
    <span className="h-full">
      {currentText}
      <span className="typing-cursor"></span>
    </span>
  );
}

    