import React from 'react';
import './Sponsi.css';

import Navbar from '../../Components/Navbar/Navbar';

// Background & Header Assets
import bgImage from '../../assets/bgsponsi.webp';
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
import logo1 from '../../assets/logo1.png';
import logo2 from '../../assets/logo2.png';
import logo3 from '../../assets/logo3.png';
import logo4 from '../../assets/logo4.png';
import logo5 from '../../assets/logo5.png';
import logo6 from '../../assets/logo6.png';
import logo7 from '../../assets/logo7.png';
import logo8 from '../../assets/logo8.png';
import logo9 from '../../assets/logo9.png';
import logo10 from '../../assets/logo10.png';
import logo11 from '../../assets/logo11.png';
import logo12 from '../../assets/logo12.png';
import logo13 from '../../assets/logo13.png';

const DANGLERS = [dangler1, dangler2, dangler3];

// 🟢 Map the titles to their specific logos. 
// Logo 2 is handled separately as the Title Sponsor.
const SPONSORS_DATA = [
  { id: 1, img: logo1, title: "Official Student Partner" },
  { id: 3, img: logo3, title: "Wellness Partner" },
  { id: 4, img: logo4, title: "Indulgeo Essentials Skincare Partner" },
  { id: 5, img: logo5, title: "Wellness Partner" },
  { id: 6, img: logo6, title: "Banking Partner" },
  { id: 7, img: logo7, title: "Gifting Partner" },
  { id: 8, img: logo8, title: "Hygiene Partner" },
  { id: 9, img: logo9, title: "Digital Partner" }, // Logo 9 had no specified title
  { id: 10, img: logo10, title: "Dining Partner" },
  { id: 11, img: logo11, title: "Career Partner" },
  { id: 12, img: logo12, title: "Technology Partner" },
  { id: 13, img: logo13, title: "Food & Beverage Partner" },
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
   MAIN COMPONENT
   ========================================================= */
export default function Sponsi() {
  return (
    <div className="sponsi-container">
      <Navbar isVisible={true} />

      {/* 1. FIXED BACKGROUND LAYER */}
      <div
        className="sponsi-background"
        style={{ backgroundImage: `url("${bgImage}")` }}
        aria-hidden="true"
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

        {/* 🟢 THE FLEXIBLE ITINERARY-STYLE GRID */}
        <div className="sponsi-grid-container">
          
          {/* --- TITLE SPONSOR (Full Row) --- */}
          <div className="sponsi-grid-cell title-sponsor-cell">
            <div className="sponsi-noise-overlay" />
            <div className="sponsi-cell-content">
              <img src={logo2} alt="Title Sponsor" className="sponsi-logo-img" />
              <h3 className="sponsi-logo-title">Title Sponsor</h3>
            </div>
          </div>

          {/* --- THE REMAINING CATEGORY SPONSORS --- */}
          {SPONSORS_DATA.map((sponsor) => (
            <div key={sponsor.id} className="sponsi-grid-cell">
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
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}