'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    // Split title for character animation
    const chars = titleRef.current.innerText.split('');
    titleRef.current.innerHTML = chars
      .map((char) => `<span class="char inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');

    gsap.fromTo(
      titleRef.current.querySelectorAll('.char'),
      { y: 100, opacity: 0, rotateX: -90 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.02,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      }
    );
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="section min-h-screen flex flex-col justify-center">
      <div>
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">
          Bereit für dein Projekt?
        </p>
        
        <h2 ref={titleRef} className="contact-title">
          Let&apos;s talk.
        </h2>
        
        <a href="mailto:hello@dcentral.at" className="contact-email">
          hello@dcentral.at
        </a>
        
        <div className="mt-16 flex flex-wrap gap-8">
          <a 
            href="https://instagram.com/dcentral.at" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors"
          >
            Instagram
          </a>
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-white transition-colors"
          >
            LinkedIn
          </a>
          <a 
            href="tel:+43123456789" 
            className="text-gray-500 hover:text-white transition-colors"
          >
            +43 XXX XXX XXX
          </a>
        </div>
        
        <div className="mt-16 text-sm text-gray-600">
          <p>Gmunden, Oberösterreich</p>
          <p className="mt-1">© {new Date().getFullYear()} dcentral. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </section>
  );
}
