"use client"

import React, { useEffect, useState } from 'react';

const AnimatedCounter = ({ value, duration = 2000 }: { value: number, duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;

    const totalFrames = duration / (1000 / 60);
    const increment = end / totalFrames;

    const counter = () => {
      start += increment;
      if (start >= end) {
        setCount(end);
      } else {
        setCount(Math.ceil(start));
        requestAnimationFrame(counter);
      }
    };
    
    requestAnimationFrame(counter);
    
  }, [value, duration]);

  return <span>{count.toLocaleString()}</span>;
};

export default AnimatedCounter;
