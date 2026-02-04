'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import dynamic from 'next/dynamic';

// Dynamic import for 3D components (client-side only)
const Scene3D = dynamic(() => import('./Scene3D'), { 
  ssr: false,
});

const NoiseBackground = dynamic(() => import('./NoiseBackground'), { 
  ssr: false,
});

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const tl = gsap.timeline({ delay: 1.2 });

    // Split title into characters for animation
    if (titleRef.current) {
      const chars = titleRef.current.innerText.split('');
      titleRef.current.innerHTML = chars
        .map((char) => `<span class="char inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('');

      tl.fromTo(
        titleRef.current.querySelectorAll('.char'),
        { y: 100, opacity: 0, rotateX: -90 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.04,
          ease: 'power3.out',
        }
      );
    }

    tl.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    );

    tl.fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    );
  }, [mounted]);

  const scrollToWork = () => {
    const element = document.getElementById('work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero relative">
      {/* 3D Background - only render on client */}
      {mounted && (
        <>
          <NoiseBackground />
          <Scene3D />
        </>
      )}
      
      {/* Fallback background */}
      {!mounted && (
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      )}
      
      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 z-[1]" />
      
      <div className="hero-content relative z-10">
        <h1 ref={titleRef} className="hero-title">
          dcentral
        </h1>
        <p ref={subtitleRef} className="hero-subtitle">
          Video • Foto • Web • Dein digitaler Partner
        </p>
        <button
          ref={ctaRef}
          onClick={scrollToWork}
          className="magnetic-btn mt-12"
        >
          <span>Projekte ansehen</span>
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-10">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-white/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-accent animate-scroll-line" />
        </div>
      </div>
    </section>
  );
}
