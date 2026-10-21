import React, { useEffect, useRef } from 'react';
import './Sponsi.css';

import Navbar from '../../Components/Navbar/Navbar';
import { Vortex } from '../../Components/Vortex/Vortex';

// Header Assets
import sponsorHeading from '../../assets/Sponsor.webp';
import sponsorTop from '../../assets/Sponsor Top.webp';
import sponsorBottom from '../../assets/Sponsor Bottom.webp';

// Decoration Assets
import dangler1 from '../../assets/Dangler 1.webp';
import dangler2 from '../../assets/Dangler 2.webp';
import dangler3 from '../../assets/Dangler 3.webp';
import danglerTop from '../../assets/Dangler Top.webp';
import mandalaBottom from '../../assets/Mandala.webp';

// The 13 Sponsor Logos
import logo1 from '../../assets/logo1.webp';
import logo2 from '../../assets/logo2.webp';
import logo3 from '../../assets/logo3.webp';
import logo4 from '../../assets/logo4.webp';
import logo5 from '../../assets/logo5.webp';
import logo6 from '../../assets/logo6.webp';
import logo7 from '../../assets/logo7.webp';
import logo8 from '../../assets/logo8.webp';
import logo9 from '../../assets/logo9.webp';
import logo10 from '../../assets/logo10.webp';
import logo11 from '../../assets/logo11.webp';
import logo12 from '../../assets/logo12.webp';
import logo13 from '../../assets/logo13.webp';

const DANGLERS = [dangler1, dangler2, dangler3];

const SPONSORS_DATA = [
  { id: 1, img: logo1, title: "Official Student Partner" },
  { id: 3, img: logo3, title: "Wellness Partner" },
  { id: 4, img: logo4, title: "Indulgeo Essentials Skincare Partner" },
  { id: 5, img: logo5, title: "Gifting Partner" },
  { id: 6, img: logo6, title: "Banking Partner" },
  { id: 7, img: logo7, title: "Wellness Partner" },
  { id: 8, img: logo8, title: "Hygiene Partner" },
  { id: 9, img: logo9, title: "Digital Partner" }, 
  { id: 10, img: logo10, title: "Dining Partner" },
  { id: 11, img: logo11, title: "Career Partner" },
  { id: 12, img: logo12, title: "Technology Partner" },
  { id: 13, img: logo13, title: "" },
];

/* =========================================================
   DANGLER CLUSTER
   ========================================================= */
function DanglerCluster({ side }) {
  return (
    <div className={`dangler-cluster ${side}-cluster`} aria-hidden="true">
      <img src={danglerTop} className="dangler-top" alt="" draggable="false" />
      <div className="dangler-row">
        {DANGLERS.map((src, index) => (
          <div key={index} className={`dangler sway-${index + 1}`}>
            <img src={src} alt="" draggable="false" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   🟢 FADE-IN WRAPPER COMPONENT
   ========================================================= */
function FadeInCell({ children, className }) {
  const cellRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Only animate once
        }
      },
      { threshold: 0.15 } // Trigger when 15% visible
    );

    if (cellRef.current) {
      observer.observe(cellRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cellRef} className={`sponsi-grid-cell fade-in-cell ${className || ''}`}>
      {children}
    </div>
  );
}

/* =========================================================
   MAIN COMPONENT
   ========================================================= */
export default function Sponsi() {
  return (
    <div className="sponsi-container">
      <Navbar isVisible={true} />

      {/* 1. 🟢 NEW FIXED BACKGROUND LAYER: VORTEX */}
      <Vortex 
        particleCount={350} 
        baseHue={260} 
        rangeHue={60} 
        backgroundColor="#05000a" 
      />

      {/* 2. FIXED DECORATION LAYER (Mandalas & Danglers) */}
      <div className="sponsi-decoration-layer" aria-hidden="true">
        <DanglerCluster side="left" />
        <DanglerCluster side="right" />

        <img src={mandalaBottom} alt="" className="mandala-top gear-spin-left" draggable="false" />
        <img src={mandalaBottom} alt="" className="mandala-top gear-spin-right" draggable="false" />
        <img src={mandalaBottom} alt="" className="mandala-bottom gear-spin-left" draggable="false" />
        <img src={mandalaBottom} alt="" className="mandala-bottom gear-spin-right" draggable="false" />
      </div>

      {/* 3. SCROLLABLE FOREGROUND CONTENT */}
      <div className="sponsi-scroll-content">
        
        {/* Header Banner */}
        <div className="sponsi-header-banner">
          <img src={sponsorTop} alt="" className="sponsor-top-decoration" draggable="false" />
          <img src={sponsorHeading} alt="Our Sponsors" className="sponsor-heading" draggable="false" />
          <img src={sponsorBottom} alt="" className="sponsor-bottom-decoration" draggable="false" />
        </div>

        {/* THE FLEXIBLE ITINERARY-STYLE GRID */}
        <div className="sponsi-grid-container">
          
          {/* --- TITLE SPONSOR (Full Row, Fade In) --- */}
          <FadeInCell className="title-sponsor-cell">
            <div className="sponsi-noise-overlay" />
            <div className="sponsi-cell-content">
              <img src={logo2} alt="Title Sponsor" className="sponsi-logo-img" />
              <h3 className="sponsi-logo-title">Title Sponsor</h3>
            </div>
          </FadeInCell>

          {/* --- THE REMAINING CATEGORY SPONSORS (Fade In) --- */}
          {SPONSORS_DATA.map((sponsor) => (
            <FadeInCell key={sponsor.id}>
              <div className="sponsi-noise-overlay" />
              <div className="sponsi-cell-content">
                <img 
                  src={sponsor.img} 
                  alt={sponsor.title || `Sponsor ${sponsor.id}`} 
                  className="sponsi-logo-img" 
                />
                {sponsor.title && (
                  <h4 className="sponsi-logo-title">{sponsor.title}</h4>
                )}
              </div>
            </FadeInCell>
          ))}

        </div>

      </div>
    </div>
  );
}