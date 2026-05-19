"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { GlassCard } from '@/components/ui/Card';
import { EXPERIENCE_ITEMS, EDUCATION_ITEMS, SKILL_CATEGORIES, EXTERNAL_LINKS } from '@/lib/constants';

export const ResumeSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".section-header", {
        scrollTrigger: {
          trigger: ".section-header",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power3.out"
      });

      gsap.from(".exp-item", {
        scrollTrigger: {
          trigger: ".exp-list",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out"
      });

      gsap.from(".skill-category", {
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power4.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="max-w-container-max mx-auto space-y-0">
      {/* EXPERIENCE SECTION */}
      <section id="resume" className="py-20 px-margin-mobile md:px-gutter">
        <div className="mb-20 section-header">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-on-surface mb-4">
            Experience <span className="text-primary italic">Timeline.</span>
          </h2>
          <p className="text-on-surface-variant font-mono text-sm uppercase tracking-widest">Building systems in production</p>
        </div>

        <div className="relative exp-list">
          <div className="absolute left-0 md:left-48 top-0 bottom-0 w-[1px] bg-outline-variant/30 hidden md:block"></div>
          
          <div className="space-y-16">
            {EXPERIENCE_ITEMS.map((exp, index) => (
              <div key={index} className="exp-item relative grid grid-cols-1 md:grid-cols-[12rem_1fr] gap-8 md:gap-16">
                <div className="hidden md:flex justify-end pt-2 text-right">
                   <span className="text-primary font-mono text-[10px] uppercase tracking-widest bg-primary/5 px-4 py-1.5 border border-primary/20 rounded-full h-fit shadow-[0_0_15px_rgba(87,241,219,0.05)]">
                    {exp.period}
                  </span>
                </div>

                <div className="relative pl-8 md:pl-0">
                  <div className="absolute left-0 md:-left-[4.25rem] top-3.5 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_12px_#57f1db]"></div>
                  
                  <div className="md:hidden mb-4">
                    <span className="text-primary font-mono text-[10px] uppercase tracking-widest bg-primary/5 px-4 py-1.5 border border-primary/20 rounded-full">
                      {exp.period}
                    </span>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-on-surface">{exp.role}</h3>
                    <p className="text-on-surface-variant font-mono text-xs uppercase tracking-widest mt-1 opacity-80">{exp.company} • {exp.location}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {exp.tech.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 bg-surface-container-high border border-outline-variant/30 text-[9px] font-mono text-primary/80 uppercase tracking-wider rounded-sm">
                        {t}
                      </span>
                    ))}
                  </div>

                  <p className="text-on-surface-variant text-lg max-w-4xl leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section id="education" className="py-20 px-margin-mobile md:px-gutter">
        <div className="mb-12 section-header">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-on-surface mb-4">
            Educational <span className="text-primary italic">Foundation.</span>
          </h2>
          <p className="text-on-surface-variant font-mono text-sm uppercase tracking-widest">Academic Excellence & Rigor</p>
        </div>

        <div className="relative exp-list">
          <div className="absolute left-0 md:left-48 top-0 bottom-0 w-[1px] bg-outline-variant/30 hidden md:block"></div>
          
          <div className="space-y-12">
            {EDUCATION_ITEMS.map((edu, index) => (
              <div key={index} className="exp-item relative grid grid-cols-1 md:grid-cols-[12rem_1fr] gap-8 md:gap-16">
                 <div className="hidden md:flex justify-end pt-2 text-right">
                     <span className="text-primary font-mono text-[10px] uppercase tracking-widest bg-primary/5 px-4 py-1.5 border border-primary/20 rounded-full h-fit shadow-[0_0_15px_rgba(87,241,219,0.05)]">
                      {edu.period}
                    </span>
                  </div>

                <div className="relative pl-8 md:pl-0">
                  <div className="absolute left-0 md:-left-[4.25rem] top-3.5 w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_12px_#57f1db]"></div>
                  
                  <div className="md:hidden mb-4">
                    <span className="text-primary font-mono text-[10px] uppercase tracking-widest bg-primary/5 px-4 py-1.5 border border-primary/20 rounded-full">
                      {edu.period}
                    </span>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-on-surface">{edu.degree}</h3>
                    <p className="text-on-surface-variant font-mono text-xs uppercase tracking-widest mt-1 opacity-80">{edu.institution}</p>
                  </div>
                  <p className="text-on-surface-variant text-lg max-w-4xl leading-relaxed" dangerouslySetInnerHTML={{ __html: edu.description }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="py-20 px-margin-mobile md:px-gutter">
        <div className="mb-16 section-header">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-on-surface mb-4">
            Technical <span className="text-primary italic">Stack.</span>
          </h2>
          <p className="text-on-surface-variant font-mono text-sm uppercase tracking-widest">Architecting with modern tools</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 skills-grid">
          {SKILL_CATEGORIES.map((skill, index) => (
            <GlassCard key={index} className="skill-category h-full flex flex-col p-8 bg-surface-container-lowest border border-outline-variant/30 hover:border-primary/50 transition-colors">
              <h3 className="font-mono text-xs font-bold text-primary uppercase tracking-widest mb-6 border-b border-outline-variant/30 pb-4">
                {skill.category}
              </h3>
              <ul className="space-y-4 flex-grow">
                {skill.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-on-surface/90 font-medium group text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-outline-variant group-hover:bg-primary group-hover:scale-150 transition-all"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <a 
            href={EXTERNAL_LINKS.RESUME_DOWNLOAD} 
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 px-10 py-4 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-primary/50 text-white font-bold uppercase tracking-widest text-xs rounded-full transition-all hover:scale-105 hover:bg-white/10 group shadow-2xl"
          >
            <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            </div>
            Download Resume
          </a>
        </div>
      </section>
    </div>
  );
};
