'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import CustomCursor from '@/components/CustomCursor';
import SmoothScroll from '@/components/SmoothScroll';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Portfolio from '@/components/Portfolio';
import Services from '@/components/Services';
import About from '@/components/About';
import Contact from '@/components/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      // Animate loading screen out
      gsap.to('.loading-screen', {
        yPercent: -100,
        duration: 0.8,
        ease: 'power3.inOut',
        onComplete: () => {
          document.querySelector('.loading-screen')?.remove();
        },
      });
    }
  }, [isLoading]);

  return (
    <>
      {/* Loading Screen */}
      <div className="loading-screen">
        <div className="loading-text">
          <span className="inline-block animate-pulse">dcentral</span>
        </div>
      </div>

      <CustomCursor />
      
      <SmoothScroll>
        <Navigation />
        
        <main>
          <Hero />
          <Portfolio />
          <Services />
          <About />
          <Contact />
        </main>
      </SmoothScroll>
    </>
  );
}
