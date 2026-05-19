"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { EXTERNAL_LINKS } from '@/lib/constants';

export const ProfileSection = () => {
  const profileRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".profile-title", {
        y: 100,
        skewY: 7,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
      });

      gsap.from(".profile-subtitle", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
        ease: "power3.out"
      });

      gsap.from(".profile-cta", {
        y: 20,
        opacity: 0,
        duration: 1,
        delay: 0.6,
        ease: "power2.out"
      });

      gsap.from(terminalRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.5,
        delay: 0.8,
        ease: "power4.out"
      });
      gsap.to(".grid-pattern", {
        scrollTrigger: {
          trigger: profileRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 100,
      });
    }, profileRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={profileRef} id="home" className="relative min-h-screen flex flex-col items-center justify-center pt-24 overflow-hidden px-margin-mobile md:px-gutter">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-0"></div>
      
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center profile-content">
        <div className="flex flex-col items-center mb-10">
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-primary/20 p-1 mb-6 group">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-all duration-700"></div>
            <div className="relative w-full h-full rounded-full overflow-hidden border border-white/10 z-10 shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={EXTERNAL_LINKS.PROFILE_PHOTO} 
                alt="Vaibhav" 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-outline-variant">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-on-surface-variant">📍 Based in Pune, India</span>
          </div>
        </div>
        
        <h1 className="profile-title font-display text-4xl md:text-7xl font-bold text-on-surface mb-6 tracking-tight">
          Building the <span className="text-primary italic">backbone</span> of modern applications.
        </h1>
        
        <p className="profile-subtitle font-sans text-lg md:text-xl text-on-surface-variant max-w-2xl mb-12 leading-relaxed flex items-center justify-center gap-3">
          Vaibhav Jain — Backend Engineer specializing in high-throughput APIs and scalable architectures.
        </p>
        
        <div className="profile-cta flex flex-col sm:flex-row gap-4 items-center justify-center w-full mb-20">
          <a 
            href="#projects"
            className="w-full sm:w-auto px-8 py-4 bg-surface-container-low text-primary border border-primary rounded-sm font-mono text-xs font-bold hover:shadow-[0_0_20px_rgba(87,241,219,0.3)] transition-all uppercase tracking-widest text-center"
          >
            View Projects
          </a>
          <a 
            href={EXTERNAL_LINKS.RESUME_VIEW} 
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-transparent text-secondary border border-outline-variant rounded-sm font-mono text-xs font-bold hover:border-secondary transition-all uppercase tracking-widest text-center"
          >
            View Resume
          </a>
        </div>

        {/* Terminal Mockup */}
        <div 
          ref={terminalRef}
          className="w-full bg-surface-container-lowest border border-[#262626] rounded-xl overflow-hidden text-left relative shadow-2xl"
        >
          <div className="bg-surface-container-low border-b border-[#262626] px-4 py-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            <span className="ml-4 font-mono text-[11px] text-on-surface-variant opacity-60">bash — vaibhav@architect: ~</span>
          </div>
          <div className="p-6 font-mono text-sm text-on-surface-variant leading-relaxed min-h-[160px]">
            <div className="flex gap-3">
              <span className="text-primary">user@vaibhav:~$</span>
              <span className="text-on-surface">./optimize_system.sh</span>
            </div>
            <div className="mt-2 text-secondary opacity-80">[INFO] Scanning 12k+ monthly API transactions...</div>
            <div className="text-secondary opacity-80">[INFO] Syncing Redis distributed cache (latency -40%)</div>
            <div className="text-secondary opacity-80">[INFO] Orchestrating Kafka event-driven backbone...</div>
            <div className="mt-2 text-primary font-bold">[SUCCESS] Production infrastructure optimized for scale.</div>
            <div className="flex gap-3 mt-4">
              <span className="text-primary">user@vaibhav:~$</span>
              <span className="w-2 h-5 bg-primary animate-blink"></span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
    </section>
  );
};
