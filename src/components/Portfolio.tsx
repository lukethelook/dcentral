'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Projekt Eins',
    category: 'Imagefilm',
    image: '/placeholder-1.jpg',
    // video: '/project-1.mp4', // Add video for hover preview
  },
  {
    id: 2,
    title: 'Projekt Zwei',
    category: 'Fotografie',
    image: '/placeholder-2.jpg',
  },
  {
    id: 3,
    title: 'Projekt Drei',
    category: 'Webdesign',
    image: '/placeholder-3.jpg',
  },
  {
    id: 4,
    title: 'Projekt Vier',
    category: 'Aerial',
    image: '/placeholder-4.jpg',
  },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

    // Animate title
    gsap.fromTo(
      titleRef.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
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
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
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
      <h2 ref={titleRef} className="section-title">
        Selected Work
      </h2>
      
      <div className="portfolio-grid">
        {projects.map((project) => (
          <article key={project.id} className="portfolio-item">
            {/* Placeholder gradient - replace with actual images/videos */}
            <div 
              className="w-full h-full"
              style={{ 
                background: `linear-gradient(${45 + project.id * 30}deg, #1a1a2e ${project.id * 10}%, #16213e 50%, #0f3460 100%)` 
              }}
            />
            {/* <img src={project.image} alt={project.title} /> */}
            
            <div className="portfolio-overlay">
              <h3 className="portfolio-title">{project.title}</h3>
              <span className="portfolio-category">{project.category}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
