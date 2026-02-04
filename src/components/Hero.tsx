'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    // Split title into characters for animation
    if (titleRef.current) {
      const chars = titleRef.current.innerText.split('');
      titleRef.current.innerHTML = chars
        .map((char) => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('');

      tl.fromTo(
        titleRef.current.querySelectorAll('.char'),
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.03,
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
  }, []);

  const scrollToWork = () => {
    const element = document.getElementById('work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      {/* Placeholder for video - replace with your actual video */}
      <div className="hero-video" style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)' }}>
        {/* <video autoPlay muted loop playsInline>
          <source src="/hero-video.mp4" type="video/mp4" />
        </video> */}
      </div>
      
      <div className="hero-content">
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
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-12 bg-white/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-white animate-pulse" />
        </div>
      </div>
    </section>
  );
}
