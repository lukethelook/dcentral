'use client';

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Initialize scroll animations
    initScrollAnimations();

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
    };
  }, []);

  const initScrollAnimations = () => {
    // Fade in elements on scroll
    gsap.utils.toArray('.fade-in').forEach((el) => {
      gsap.fromTo(
        el as Element,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el as Element,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Parallax effect on images
    gsap.utils.toArray('.parallax').forEach((el) => {
      gsap.to(el as Element, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: el as Element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    // Text reveal animations
    gsap.utils.toArray('.reveal-text').forEach((el) => {
      const element = el as Element;
      ScrollTrigger.create({
        trigger: element,
        start: 'top 80%',
        onEnter: () => element.classList.add('revealed'),
      });
    });
  };

  return <>{children}</>;
}
