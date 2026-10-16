import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import './Team.css';

// ==========================================
// 🛠️ CONFIG & DIRECTORY MAPPING
// ==========================================
const AUTO_SPEED = 0.6;     // Scroll speed
const RESUME_DELAY = 2500;  // Pause duration after interacting
const LOOP_COPIES = 3;      // Required for the seamless infinite loop
const TOTAL_PAGES = 12;     // The exact number of wall images

// The array of pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const PAGES = Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1);

// The Podium Index Links mapping exactly to your request
const PODIUM_LINKS = [
  { label: 'Website', pageNumber: 2 },
  { label: 'Event Management', pageNumber: 4 },
  { label: 'PR & Security', pageNumber: 6 },
  { label: 'Creative', pageNumber: 7 },
  { label: 'HR & Logistics', pageNumber: 8 },
  { label: 'Sponsorship', pageNumber: 10 },
  { label: 'Social Media', pageNumber: 11 },
];

const preloadedAssets = import.meta.glob('../../assets/*.{webp,jpg,jpeg,svg,png}', {
  eager: true,
  import: 'default',
});

const getAsset = (name) => {
  const path = `../../assets/${name}`;
  if (!preloadedAssets[path]) {
    console.warn(`Asset not found: ${name}`);
    return null;
  }
  return preloadedAssets[path];
};

// ==========================================
// 🚀 MAIN PAGE COMPONENT
// ==========================================
export default function TeamPage() {
  const scrollRef = useRef(null);
  const interactionRef = useRef({ trigger: () => {} });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const hoverTimeoutRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Start in the middle loop for infinite scroll safety
    const loopWidth = () => el.scrollWidth / LOOP_COPIES;
    el.scrollLeft = loopWidth(); 

    let pos = el.scrollLeft;
    let raf;
    let hovering = false;
    let interacting = false;
    let timer;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Pauses the auto-scroll loop for manual interactions/clicks
    const touch = () => {
      interacting = true;
      clearTimeout(timer);
      timer = setTimeout(() => {
        pos = el.scrollLeft;
        interacting = false;
      }, RESUME_DELAY);
    };
    
    interactionRef.current.trigger = touch;

    const onScroll = () => {
      const s = loopWidth();
      if (el.scrollLeft >= s * 2) el.scrollLeft -= s;
      else if (el.scrollLeft < s * 0.5) el.scrollLeft += s;
      if (interacting) touch();
    };

    const onWheel = (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) el.scrollLeft += e.deltaY;
      touch();
    };
    
    const onEnter = () => { hovering = true; };
    const onLeave = () => { hovering = false; pos = el.scrollLeft; };

    const tick = () => {
      if (!interacting && !hovering && !reduceMotion) {
        pos += AUTO_SPEED;
        el.scrollLeft = pos;
        if (pos >= loopWidth() * 2) pos -= loopWidth();
      }
      raf = requestAnimationFrame(tick);
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    el.addEventListener('wheel', onWheel, { passive: true });
    el.addEventListener('pointerdown', touch);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      el.removeEventListener('scroll', onScroll);
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('pointerdown', touch);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const handleMouseEnterPodium = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsSidebarOpen(true);
  };

  const handleMouseLeavePodium = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsSidebarOpen(false);
    }, 250);
  };

  const handleSidebarClick = (pageNumber) => {
    // 1 always denotes the middle copy to ensure the infinite scroll math doesn't break
    const target = document.getElementById(`1-page-${pageNumber}`);
    if (target) {
      interactionRef.current.trigger();
      target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  };

  return (
    <div className="team-page-wrapper">
      <Navbar isVisible={true} />

      {/* 🟢 FLOATING HEADING */}
      <div className="team-heading-container">
        <img src={getAsset('teamheading.webp')} alt="Team Heading" className="team-heading-image" />
      </div>

      {/* 🟢 DIRECTORY SIDEBAR */}
      <nav 
        className="team-sidebar-container"
        style={{ 
          pointerEvents: isSidebarOpen ? 'auto' : 'none',
          opacity: isSidebarOpen ? 1 : 0 
        }}
        onMouseEnter={handleMouseEnterPodium} 
        onMouseLeave={handleMouseLeavePodium}
      >
        {PODIUM_LINKS.map((link, index) => {
          const reverseIndex = PODIUM_LINKS.length - 1 - index;
          return (
            <button
              key={link.pageNumber}
              onClick={() => handleSidebarClick(link.pageNumber)}
              className="team-sidebar-item"
              style={{
                opacity: isSidebarOpen ? 1 : 0,
                transform: isSidebarOpen ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${reverseIndex * 30}ms`,
              }}
            >
              {link.label}
            </button>
          );
        })}
      </nav>

      {/* 🟢 12-IMAGE FULLSCREEN CAROUSEL */}
      <div className="team-scroll-container" ref={scrollRef}>
        <div className="team-track">
          {Array.from({ length: LOOP_COPIES }).map((_, copy) => (
            <React.Fragment key={`loop-${copy}`}>
              {PAGES.map((pageNum) => (
                <img 
                  key={`${copy}-${pageNum}`}
                  id={`${copy}-page-${pageNum}`}
                  src={getAsset(`page${pageNum}.webp`)}
                  alt={`Team Section ${pageNum}`}
                  className="team-wall-image"
                  draggable={false}
                  // Performance hack: Only eager load the middle loop (the one the user actually sees on page load)
                  loading={copy === 1 ? "eager" : "lazy"} 
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 🟢 PODIUM */}
      <div 
        className="team-podium-container"
        onMouseEnter={handleMouseEnterPodium}
        onMouseLeave={handleMouseLeavePodium}
      >
        <img 
          src={getAsset('podium.webp')} 
          alt="Menu" 
          className="team-podium-image" 
          draggable={false}
          style={{ filter: isSidebarOpen ? 'brightness(1.1) drop-shadow(0 0 15px rgba(255,215,0,0.6))' : 'none' }}
        />
      </div>
    </div>
  );
}