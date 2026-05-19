"use client";

import { ReactLenis, useLenis } from 'lenis/react';
import { useEffect } from 'react';
import { ScrollTrigger } from '@/lib/gsap';

// A dedicated helper component that has access to the Lenis context.
// This is 100% robust and avoids timing/hydration issues with React refs.
const ScrollSync = () => {
  useLenis(() => {
    // Update GSAP ScrollTrigger on every Lenis scroll tick
    ScrollTrigger.update();
  });

  useEffect(() => {
    // Initial refresh to register the dimensions
    ScrollTrigger.refresh();

    // Recalculate ScrollTrigger on window resize
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);

    // Periodic refresh to accommodate lazy-loaded Suspense modules
    const timer = setInterval(() => {
      ScrollTrigger.refresh();
    }, 1500);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(timer);
    };
  }, []);

  return null;
};

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactLenis 
      root 
      options={{ 
        duration: 1.2,
        lerp: 0.1, 
        smoothWheel: true,
        syncTouch: false, // Respect native mobile scrolling physics
        wheelMultiplier: 1.0,
        anchors: true, // Enable automatic smooth scrolling for all anchor/hash links
      }}
    >
      <ScrollSync />
      {children}
    </ReactLenis>
  );
};
