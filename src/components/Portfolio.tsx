'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Projekt Eins',
    category: 'Imagefilm',
    color: 'from-emerald-900 to-cyan-900',
  },
  {
    id: 2,
    title: 'Projekt Zwei',
    category: 'Fotografie',
    color: 'from-purple-900 to-pink-900',
  },
  {
    id: 3,
    title: 'Projekt Drei',
    category: 'Webdesign',
    color: 'from-orange-900 to-red-900',
  },
  {
    id: 4,
    title: 'Projekt Vier',
    category: 'Aerial',
    color: 'from-blue-900 to-indigo-900',
  },
];

function PortfolioItem({ project, index }: { project: typeof projects[0]; index: number }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  return (
    <article
      ref={itemRef}
      className="portfolio-item group hover-lift"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateY(${mousePos.x * 10}deg) rotateX(${-mousePos.y * 10}deg) scale(1.02)`
          : 'perspective(1000px) rotateY(0) rotateX(0) scale(1)',
        transition: 'transform 0.3s ease-out',
      }}
    >
      {/* Animated gradient background */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${project.color} transition-all duration-500`}
        style={{
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        }}
      />
      
      {/* Animated noise overlay */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Glow effect on hover */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(0,255,136,0.3) 0%, transparent 50%)`,
        }}
      />

      {/* Project number */}
      <div className="absolute top-4 right-4 text-7xl font-bold opacity-10 group-hover:opacity-30 transition-opacity">
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Content overlay */}
      <div className="portfolio-overlay">
        <h3 className="portfolio-title">{project.title}</h3>
        <span className="portfolio-category">{project.category}</span>
        
        {/* View project indicator */}
        <div className="mt-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
          <span className="text-sm uppercase tracking-wider">View Project</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </article>
  );
}

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    // Animate title with split text
    const chars = titleRef.current.innerText.split('');
    titleRef.current.innerHTML = chars
      .map((char) => `<span class="char inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');

    gsap.fromTo(
      titleRef.current.querySelectorAll('.char'),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.03,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      }
    );

    // Animate portfolio items
    gsap.fromTo(
      '.portfolio-item',
      { y: 100, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.portfolio-grid',
          start: 'top 70%',
        },
      }
    );
  }, []);

  return (
    <section id="work" ref={sectionRef} className="section">
      <h2 ref={titleRef} className="section-title gradient-text">
        Selected Work
      </h2>
      
      <div className="portfolio-grid">
        {projects.map((project, index) => (
          <PortfolioItem key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
