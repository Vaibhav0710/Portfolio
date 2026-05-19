"use client";

import React, { useRef, useEffect } from 'react';
import { gsap } from '@/lib/gsap';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    return () => {
      gsap.killTweensOf(card);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={cn(
        "glass rounded-xl p-6 transition-shadow hover:shadow-[0_20px_50px_rgba(87,241,219,0.1)]",
        className
      )}
    >
      {children}
    </div>
  );
};
