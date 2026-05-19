import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/30 pt-12 pb-16 px-margin-mobile md:px-gutter">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="font-mono text-xs tracking-widest text-primary font-bold">
            VAIBHAV.JAIN
          </div>
          <p className="text-[10px] font-mono text-on-surface-variant/60 uppercase tracking-widest">
            © 2026 Built for performance. Engineered for scale.
          </p>
        </div>
        
        <div className="flex gap-8 items-center font-mono text-[10px] uppercase tracking-widest text-on-surface-variant/80">
          <a href="https://github.com/Vaibhav0710" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">GitHub</a>
          <a href="https://www.linkedin.com/in/-vaibhavjain/" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-primary transition-colors">Source</a>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
          <span className="font-mono text-[10px] text-primary/80 uppercase tracking-tighter">Region: Pune, India</span>
        </div>
      </div>
    </footer>
  );
};
