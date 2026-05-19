"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { GlassCard } from '@/components/ui/Card';
import { PROJECT_ITEMS } from '@/lib/constants';

export const ProjectsGrid = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".projects-header", {
        scrollTrigger: {
          trigger: ".projects-header",
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: ".projects-grid",
          start: "top 70%",
        },
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-20 px-margin-mobile md:px-gutter max-w-container-max mx-auto">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-8 projects-header">
        <div>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-on-surface mb-4">
            Selected <span className="text-primary italic">Works.</span>
          </h2>
          <p className="text-on-surface-variant max-w-xl">
            A showcase of distributed systems, full-stack logistics, and algorithmic foundations from my GitHub.
          </p>
        </div>
        <div className="font-mono text-xs text-primary bg-primary/5 px-4 py-2 border border-primary/20 rounded-full uppercase tracking-tighter">
          Showcasing Featured Systems
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 projects-grid">
        {PROJECT_ITEMS.map((project, index) => (
          <div 
            key={index}
            className={`${index === 0 ? 'md:col-span-2' : ''}`}
          >
            <GlassCard 
              className="project-card group relative overflow-hidden flex flex-col p-8 md:p-10 h-full"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/60">{project.category}</span>
                <span className="font-mono text-[10px] text-primary">{project.year}</span>
              </div>
              
              <h3 className={`font-display font-bold text-on-surface mb-4 group-hover:text-primary transition-colors ${index === 0 ? 'text-3xl md:text-5xl' : 'text-2xl md:text-3xl'}`}>
                {project.title}
              </h3>
              
              <p className="text-on-surface-variant mb-8 flex-grow max-w-4xl text-lg leading-relaxed">
                {project.description}
              </p>
              
              {/* SERVICE NODES (Tightened) */}
              {project.services && (
                <div className="mb-8 flex flex-col items-center">
                  <p className="mb-4 text-[9px] font-mono uppercase tracking-[0.5em] text-on-surface-variant/30">Distributed Core</p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {project.services.map((service, i) => (
                      <a 
                        key={i}
                        href={service.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-surface-container-high/40 hover:bg-surface-container-highest backdrop-blur-xl border border-white/5 hover:border-primary/40 transition-all group/node rounded-full flex items-center gap-3 shadow-lg hover:-translate-y-1"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#57f1db]"></div>
                        <span className="font-bold text-[11px] text-white/80 group-hover/node:text-primary transition-colors whitespace-nowrap">{service.name}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 group-hover/node:text-primary transition-colors"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3 mt-auto">
                {project.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-surface-container-high border border-outline-variant/30 text-[10px] font-mono text-on-surface-variant uppercase tracking-wider rounded-sm">
                    {tag}
                  </span>
                ))}
              </div>

              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2.5 bg-primary/10 rounded-full hover:bg-primary/20"
                title="View on GitHub"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              </a>
            </GlassCard>
          </div>
        ))}
      </div>
    </section>
  );
};
