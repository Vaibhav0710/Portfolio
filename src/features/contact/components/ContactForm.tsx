"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { GlassCard } from '@/components/ui/Card';

export const ContactForm = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          name: data.name,
          email: data.email,
          message: data.message,
          subject: `New Portfolio Contact from ${data.name}`
        })
      });

      if (response.ok) {
        setStatus('sent');
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        const errResponse = await response.json().catch(() => ({}));
        throw new Error(errResponse.message || errResponse.error || "Upstream transmission error");
      }
    } catch (error) {
      console.error("Transmission failed, initiating fallback link:", error);
      setStatus('idle');
      
      const subject = encodeURIComponent(`New Portfolio Contact from ${data.name}`);
      const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`);
      
      const proceed = confirm(
        "A local browser shield or security software blocked the automatic transmission.\n\n" + 
        "Would you like to send your message directly via your email app (Gmail, Mail, Outlook)?"
      );
      
      if (proceed) {
        window.location.href = `mailto:vaibhavjain7171@gmail.com?subject=${subject}&body=${body}`;
      }
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-animate", {
        scrollTrigger: {
          trigger: ".contact-animate",
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="pt-24 pb-12 px-margin-mobile md:px-gutter max-w-container-max mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="contact-animate">
          <h2 className="font-display text-3xl md:text-5xl font-bold text-on-surface mb-6">
            Let&apos;s build something <span className="text-primary italic">resilient.</span>
          </h2>
          <p className="text-on-surface-variant text-lg mb-12 max-w-md">
            Whether you&apos;re looking for a technical architect, a backend expert, or just want to discuss system design—my inbox is always open.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-full glass border border-outline-variant/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-surface transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-on-surface-variant/60 mb-1">Email</p>
                <p className="text-lg font-bold text-on-surface">vaibhavjain7171@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-full glass border border-outline-variant/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-surface transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-on-surface-variant/60 mb-1">LinkedIn</p>
                <a href="https://www.linkedin.com/in/-vaibhavjain/" target="_blank" rel="noreferrer" className="text-lg font-bold text-on-surface hover:text-primary transition-colors">vaibhavjain</a>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 rounded-full glass border border-outline-variant/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-surface transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-on-surface-variant/60 mb-1">GitHub</p>
                <a href="https://github.com/Vaibhav0710" target="_blank" rel="noreferrer" className="text-lg font-bold text-on-surface hover:text-primary transition-colors">Vaibhav0710</a>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-animate">
          <GlassCard className="bg-surface-container-lowest p-8 md:p-12 border border-outline-variant/30">
            {status === 'sent' ? (
              <div className="h-[400px] flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
                <h3 className="font-display text-2xl font-bold text-on-surface">Transmission Received</h3>
                <p className="text-on-surface-variant max-w-xs">Your message has been successfully routed. I&apos;ll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Prevent bot spam */}
                <input type="text" name="_honey" style={{ display: 'none' }} />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">Name</label>
                    <input name="name" required type="text" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-sm px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors" placeholder="Your Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">Email</label>
                    <input name="email" required type="email" className="w-full bg-surface-container-low border border-outline-variant/30 rounded-sm px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors" placeholder="your_email@gmail.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">Message</label>
                  <textarea name="message" required rows={6} className="w-full bg-surface-container-low border border-outline-variant/30 rounded-sm px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors resize-none" placeholder="I'd like to talk about..."></textarea>
                </div>
                <button 
                  type="submit" 
 
                  disabled={status === 'sending'}
                  className="w-full py-4 bg-surface-container-low text-primary border border-primary rounded-sm font-mono text-xs font-bold hover:shadow-[0_0_20px_rgba(87,241,219,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase tracking-widest text-center relative overflow-hidden group"
                >
                  <span className="relative z-10">{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </section>
  );
};