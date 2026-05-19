"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLenis } from 'lenis/react';
import { NAV_LINKS } from '@/lib/constants';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const lenis = useLenis();

  // Active section spy using an extremely high-performance Intersection Observer
  useEffect(() => {
    const sectionIds = NAV_LINKS.map(link => link.href.replace('#', ''));
    
    // Filter and collect DOM elements that correspond to our navigation hashes
    const elements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    // Use a top-middle band detection layout margin
    const observerOptions = {
      root: null, // viewport-based observing
      rootMargin: '-30% 0px -60% 0px', // focused horizontal band in the upper half of screen
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target instanceof HTMLElement) {
        // Manually update the active section state instantly to make the UI feel fast
        setActiveSection(href.replace('#', ''));
        
        lenis?.scrollTo(target, {
          duration: 1.8, // Ultra-smooth, luxurious glide
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease-out curve
          offset: -64, // Subtract Navbar height offset so header is not covered
        });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-outline-variant h-16 flex items-center justify-center">
      <div className="max-w-container-max w-full px-margin-mobile md:px-gutter flex justify-between items-center">
        <div className="font-mono text-xs tracking-widest text-primary font-bold">
          VAIBHAV.BACKEND
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center text-sm font-medium">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleScrollTo(e, link.href)}
                className={`transition-colors duration-300 py-2 relative flex flex-col items-center group font-sans text-sm tracking-wide ${
                  isActive 
                    ? "text-primary font-bold" 
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                {link.name}
                {/* Premium glowing neon underline indicator */}
                <span className={`absolute bottom-0 left-0 right-0 h-[2px] bg-primary shadow-[0_0_8px_#57f1db] transition-all duration-300 transform origin-center ${
                  isActive 
                    ? "scale-x-100 opacity-100" 
                    : "scale-x-0 opacity-0 group-hover:scale-x-50 group-hover:opacity-50"
                }`} />
              </Link>
            );
          })}
        </div>
        
        <Link 
          href="#contact" 
          onClick={(e) => handleScrollTo(e, '#contact')}
          className="hidden md:block bg-surface-container-low border border-primary text-primary px-4 py-2 text-xs font-bold hover:bg-primary/10 transition-all rounded-sm uppercase tracking-tighter"
        >
          Hire Me
        </Link>
        
        {/* Mobile Toggle */}
        <button className="md:hidden text-primary" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          )}
        </button>
      </div>
 
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-surface-container-lowest border-b border-outline-variant flex flex-col p-8 gap-6 md:hidden glass animate-in fade-in slide-in-from-top-4">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <Link 
                key={link.name}
                href={link.href} 
                onClick={(e) => {
                  setIsOpen(false);
                  handleScrollTo(e, link.href);
                }} 
                className={`font-sans font-medium border-b border-outline-variant/30 pb-2 transition-colors flex items-center justify-between ${
                  isActive 
                    ? "text-primary font-bold" 
                    : "text-on-surface hover:text-primary"
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#57f1db]" />
                )}
              </Link>
            );
          })}
          <Link 
            href="#contact" 
            onClick={(e) => {
              setIsOpen(false);
              handleScrollTo(e, '#contact');
            }} 
            className="text-primary font-bold"
          >
            Hire Me
          </Link>
        </div>
      )}
    </nav>
  );
};
