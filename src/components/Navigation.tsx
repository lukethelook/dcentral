'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Animate nav on load
    gsap.fromTo(
      nav,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' }
    );
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav ref={navRef} className="nav">
      <div className="nav-logo">dcentral</div>
      <div className="nav-links">
        <button onClick={() => scrollTo('work')} className="nav-link">
          Work
        </button>
        <button onClick={() => scrollTo('services')} className="nav-link">
          Services
        </button>
        <button onClick={() => scrollTo('about')} className="nav-link">
          About
        </button>
        <button onClick={() => scrollTo('contact')} className="nav-link">
          Contact
        </button>
      </div>
    </nav>
  );
}
