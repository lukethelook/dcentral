'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const services = [
  { name: 'Imagefilm & Recruiting', number: '01' },
  { name: 'Social Media Content', number: '02' },
  { name: 'Fotografie', number: '03' },
  { name: 'Drohnenaufnahmen', number: '04' },
  { name: 'Webdesign & Entwicklung', number: '05' },
  { name: 'UI/UX Design', number: '06' },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current) return;

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

    gsap.fromTo(
      '.service-item',
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.services-list',
          start: 'top 70%',
        },
      }
    );
  }, []);

  return (
    <section id="services" ref={sectionRef} className="section">
      <h2 ref={titleRef} className="section-title">
        Was wir machen
      </h2>
      
      <div className="services-list">
        {services.map((service) => (
          <div key={service.number} className="service-item">
            <span className="service-name">{service.name}</span>
            <span className="service-number">{service.number}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
