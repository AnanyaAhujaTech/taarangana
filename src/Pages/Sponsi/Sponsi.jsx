import React, { useMemo } from 'react';
import './Sponsi.css';

import Navbar from '../../Components/Navbar/Navbar';

import bgImage from '../../assets/bgsponsi.webp';

import sponsorHeading from '../../assets/Sponsor.webp';
import sponsorTop from '../../assets/Sponsor Top.webp';
import sponsorBottom from '../../assets/Sponsor Bottom.webp';

import categorySponsor1 from '../../assets/Category Sponsor 1.webp';
import categorySponsor2 from '../../assets/Category Sponsor 2.webp';
import categorySponsor3 from '../../assets/Category Sponsor 3.webp';
import categorySponsor4 from '../../assets/Category Sponsor 4.webp';
import categorySponsor5 from '../../assets/Category Sponsor 5.webp';

import dangler1 from '../../assets/Dangler 1.webp';
import dangler2 from '../../assets/Dangler 2.webp';
import dangler3 from '../../assets/Dangler 3.webp';
import danglerTop from '../../assets/Dangler Top.webp';

import mandalaBottom from '../../assets/Mandala.webp';

import leftSideImg from '../../assets/left.png';
import rightSideImg from '../../assets/right.png';

import demo1 from '../../assets/Demo 1.webp';
import demo2 from '../../assets/Demo 2.webp';
import demo3 from '../../assets/Demo 3.webp';
import demo4 from '../../assets/Demo 4.webp';
import demo5 from '../../assets/Demo 5.webp';


/* =========================================================
   DANGLERS
   ========================================================= */

const DANGLERS_LEFT = [
  dangler1,
  dangler2,
  dangler3
];

/* =========================================================
   CATEGORY SPONSORS
   ========================================================= */

const CATEGORY_FRAMES = [
  categorySponsor1,
  categorySponsor2,
  categorySponsor3,
  categorySponsor4,
  categorySponsor5
];

const DEMO_LOGOS = [
  demo1,
  demo2,
  demo3,
  demo4,
  demo5
];


/* =========================================================
   SPONSOR CARD
   ========================================================= */

function SponsorCard({ sponsor }) {
  return (
    <div
      className="sponsor-card category-card circular-node"
      style={{ '--angle': `${sponsor.angle}deg` }}
    >
      <div className="sponsor-glow" aria-hidden="true" />

      <img
        src={sponsor.image}
        alt="Category sponsor"
        className="sponsor-frame"
        draggable="false"
      />

      {sponsor.logo && (
        <img
          src={sponsor.logo}
          alt="Category sponsor logo"
          className="sponsor-logo"
          draggable="false"
        />
      )}
    </div>
  );
}


/* =========================================================
   DANGLER CLUSTER
   ========================================================= */

function DanglerCluster({ side }) {
  return (
    <div className={`dangler-cluster ${side}-cluster`} aria-hidden="true">
      <img src={danglerTop} className="dangler-top" alt="" draggable="false" />
      <div className="dangler-row">
        {DANGLERS_LEFT.map((src, index) => (
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

  // Map only the 5 category sponsors and calculate their circular angle (360 / 5 = 72 degrees)
  const categorySponsors = useMemo(() => {
    return CATEGORY_FRAMES.map((frame, index) => ({
      id: `category-${index + 1}`,
      image: frame,
      logo: DEMO_LOGOS[index % DEMO_LOGOS.length],
      angle: (360 / CATEGORY_FRAMES.length) * index
    }));
  }, []);


  return (
    <div className="sponsi-container">
      <Navbar isVisible={true} />

      <div className="sponsi-viewport">

        {/* 1. BACKGROUND LAYER (Z-Index: 0) */}
        <div
          className="sponsi-background"
          style={{ backgroundImage: `url("${bgImage}")` }}
          aria-hidden="true"
        />

        {/* 2. SIDE IMAGES LAYER (Z-Index: 1) - In front of BG, behind Mandalas */}
        <div className="sponsi-side-images-layer" aria-hidden="true">
          <img src={leftSideImg} className="sponsi-side-img left-img" alt="" draggable="false" />
          <img src={rightSideImg} className="sponsi-side-img right-img" alt="" draggable="false" />
        </div>

        {/* 3. DECORATION LAYER (Z-Index: 2) - Mandalas & Danglers */}
        <div className="sponsi-decoration-layer" aria-hidden="true">
          <DanglerCluster side="left" />
          <DanglerCluster side="right" />

          <img src={mandalaBottom} alt="" className="mandala-top gear-spin-left" draggable="false" />
          <img src={mandalaBottom} alt="" className="mandala-top gear-spin-right" draggable="false" />
          <img src={mandalaBottom} alt="" className="mandala-bottom gear-spin-left" draggable="false" />
          <img src={mandalaBottom} alt="" className="mandala-bottom gear-spin-right" draggable="false" />
        </div>

        {/* 4. HEADER LAYER (Z-Index: 3) */}
        <div className="sponsi-fixed-header" aria-hidden="true">
          <div className="sponsi-header-banner">
            <img src={sponsorTop} alt="" className="sponsor-top-decoration" draggable="false" />
            <img src={sponsorHeading} alt="Our Sponsors" className="sponsor-heading" draggable="false" />
            <img src={sponsorBottom} alt="" className="sponsor-bottom-decoration" draggable="false" />
          </div>
        </div>

        {/* 5. CONTENT LAYER (Z-Index: 4) - Circular Layout */}
        <main className="sponsi-circular-page">
          <div className="sponsor-circle-wrapper">
            {categorySponsors.map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} />
            ))}
          </div>
        </main>

      </div>
    </div>
  );
}