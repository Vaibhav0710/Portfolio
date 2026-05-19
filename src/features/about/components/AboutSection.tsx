"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { GlassCard } from '@/components/ui/Card';
import { EXTERNAL_LINKS } from '@/lib/constants';

export const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-title", {
        scrollTrigger: {
          trigger: ".about-title",
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(".about-content", {
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 75%",
        },
        x: -30,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });

/* Entrance animation removed for reliability */
      
      gsap.from(".about-portrait", {
        scrollTrigger: {
          trigger: ".about-portrait",
          start: "top 75%",
        },
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-20 px-margin-mobile md:px-gutter max-w-container-max mx-auto overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 lg:gap-24 items-center mb-24">
        
        {/* Narrative Side */}
        <div className="space-y-10 order-2 lg:order-1">
          <div className="about-title">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-primary/50"></div>
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-primary">The Narrative</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-on-surface leading-[1.1]">
              From Mechanical Engineering to <br/> 
              <span className="text-primary italic">Backend Developer.</span>
            </h2>
          </div>

          <div className="about-content space-y-8 text-on-surface-variant font-sans text-lg md:text-xl leading-relaxed">
            <p>
              I am an <span className="text-on-surface font-semibold">Adaptive Backend Engineer</span> who thrives in high-growth environments. My background in <span className="text-secondary italic">Mechanical Engineering</span> gave me the discipline, but it was in production where I truly found my pace—rapidly mastering enterprise stacks like .NET Core and Python directly on the job.
            </p>
            <p>
              Today, I specialize in engineering <span className="text-on-surface font-semibold">distributed systems</span> at <span className="text-primary font-bold">IntelligentDX</span>. I am obsessed with the speed of learning and the precision of execution, from optimizing legacy migrations to architecting event-driven microservices.
            </p>
            
            <div className="pt-6 grid grid-cols-2 gap-12">
              <div className="border-l-2 border-primary/20 pl-6">
                <p className="text-4xl font-display font-bold text-on-surface">40%</p>
                <p className="text-[10px] font-mono uppercase tracking-widest opacity-60 mt-1">Reduction in Latency</p>
              </div>
              <div className="border-l-2 border-secondary/20 pl-6">
                <p className="text-4xl font-display font-bold text-primary">12k+</p>
                <p className="text-[10px] font-mono uppercase tracking-widest opacity-60 mt-1">Monthly API Requests</p>
              </div>
            </div>
          </div>
        </div>

        {/* Portrait Side */}
        <div className="about-portrait order-1 lg:order-2 relative group">
          <div className="absolute -inset-4 bg-primary/5 rounded-2xl blur-2xl group-hover:bg-primary/10 transition-all duration-700"></div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-all duration-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={EXTERNAL_LINKS.PROFILE_PHOTO} 
              alt="Vaibhav Jain" 
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
          </div>
          {/* Decorative Corner */}
          <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b-2 border-l-2 border-primary/30 rounded-bl-3xl"></div>
        </div>
      </div>

      {/* Philosophy Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 about-grid">
        <GlassCard className="about-card p-8 bg-surface-container-low/50 backdrop-blur-xl border border-white/5 hover:border-primary/30 transition-all">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          </div>
          <h3 className="font-display text-lg font-bold text-on-surface mb-3">Resilient by Design</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed opacity-80">I build for trust. From AES-256 encryption to HIPAA-compliant architectures, data integrity is never optional.</p>
        </GlassCard>
        
        <GlassCard className="about-card p-8 bg-surface-container-low/50 backdrop-blur-xl border border-white/5 hover:border-secondary/30 transition-all">
          <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          </div>
          <h3 className="font-display text-lg font-bold text-on-surface mb-3">Performance-Obsessed</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed opacity-80">Squeezing every millisecond out of the critical path using Redis caching and SQL optimization.</p>
        </GlassCard>

        <GlassCard className="about-card p-8 bg-surface-container-low/50 backdrop-blur-xl border border-white/5 hover:border-tertiary/30 transition-all">
          <div className="w-10 h-10 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
          </div>
          <h3 className="font-display text-lg font-bold text-on-surface mb-3">Distributed Thinking</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed opacity-80">Orchestrating microservices with Kafka and Spring Cloud to ensure absolute horizontal scalability.</p>
        </GlassCard>
      </div>
    </section>
  );
};
