'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current) return;

    // Split text into words for animation
    const words = textRef.current.innerText.split(' ');
    textRef.current.innerHTML = words
      .map((word) => `<span class="word">${word}</span>`)
      .join(' ');

    gsap.fromTo(
      textRef.current.querySelectorAll('.word'),
      { opacity: 0.1 },
      {
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'center center',
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section flex items-center">
      <div className="max-w-5xl">
        <p ref={textRef} className="text-3xl md:text-5xl lg:text-6xl font-light leading-tight">
          dcentral ist dein digitaler Partner aus dem Salzkammergut. 
          Wir kombinieren Videografie, Fotografie und Webdesign zu einem 
          nahtlosen Erlebnis. Keine Agentur-Hierarchien, keine endlosen 
          Meetings – nur kreative Lösungen, die funktionieren.
        </p>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm uppercase tracking-wider text-gray-500">
          <div>
            <span className="text-white text-2xl font-bold block mb-2">10+</span>
            Jahre Erfahrung
          </div>
          <div>
            <span className="text-white text-2xl font-bold block mb-2">50+</span>
            Projekte
          </div>
          <div>
            <span className="text-white text-2xl font-bold block mb-2">100%</span>
            Leidenschaft
          </div>
        </div>
      </div>
    </section>
  );
}
