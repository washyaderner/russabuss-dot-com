import React from 'react';
import { GlowingEffect } from './GlowingEffect';

export function ServiceCard({ title, description, icon, href }) {
  return (
    <a href={href} className="block relative h-full no-underline group" style={{ borderRadius: '0.75rem' }}>
      <div className="absolute inset-0 rounded-[0.75rem] overflow-hidden">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={2}
        />
      </div>
      
      <div 
        className="relative z-10 flex flex-col h-full bg-[var(--color-bg-secondary)] rounded-[0.75rem] border border-[var(--color-bg-elevated)] p-8 transition-colors group-hover:bg-[var(--color-bg-elevated)]"
        style={{ height: '100%' }}
      >
        <span className="text-4xl mb-4 block" aria-hidden="true">{icon}</span>
        
        <h3 className="font-display text-xl font-bold text-white mb-3">
          {title}
        </h3>
        
        <p className="font-body text-sm text-[var(--color-text-secondary)] leading-relaxed flex-1 mb-4">
          {description}
        </p>
        
        <span className="text-[var(--color-accent)] text-xl transition-transform duration-150 group-hover:translate-x-1 inline-block">
          →
        </span>
      </div>
    </a>
  );
}
