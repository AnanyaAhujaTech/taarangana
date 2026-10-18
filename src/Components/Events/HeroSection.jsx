import React, { useState, useRef } from "react";
import "./HeroSection.css";
import heading from "../../assets/EventsHeading.png";
import roofFrame from "../../assets/roof.svg"; 
import stainedGlassOverlay from "../../assets/window.svg";

// Import Videos
import vid1 from "../../assets/1.mp4";
import vid2 from "../../assets/2.mp4";
import vid3 from "../../assets/3.mp4";
import vid4 from "../../assets/4.mp4";
import vid5 from "../../assets/5.mp4";
import vid6 from "../../assets/6.mp4";
import vid7 from "../../assets/7.mp4";
import vid8 from "../../assets/8.mp4";
import vid9 from "../../assets/9.mp4";

// Import Thumbnails
import thumb1 from "../../assets/1.png"; 
import thumb2 from "../../assets/2.png";
import thumb3 from "../../assets/3.png";
import thumb4 from "../../assets/4.png";
import thumb5 from "../../assets/5.png";
import thumb6 from "../../assets/6.png";
import thumb7 from "../../assets/7.png";
import thumb8 from "../../assets/8.png";
import thumb9 from "../../assets/9.png";

const eventsList = [
  { id: 1, video: vid1, thumb: thumb1, color: "#00FFFF" }, 
  { id: 2, video: vid2, thumb: thumb2, color: "#8B0000" }, 
  { id: 3, video: vid3, thumb: thumb3, color: "#145207" }, 
  { id: 4, video: vid4, thumb: thumb4, color: "#4d13ba" }, 
  { id: 5, video: vid5, thumb: thumb5, color: "#f0e5a5" }, 
  { id: 6, video: vid6, thumb: thumb6, color: "#ae03b4" }, 
  { id: 7, video: vid7, thumb: thumb7, color: "#FF8C00" }, 
  { id: 8, video: vid8, thumb: thumb8, color: "#00008B" }, 
  { id: 9, video: vid9, thumb: thumb9, color: "#4349b8" }, 
];

// 🟢 SUB-COMPONENT: Handles individual loading & hover states
const EventCard = ({ event }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (isVideoLoaded && videoRef.current) {
      videoRef.current.play().catch(e => console.log("Play interrupted"));
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      className="video-card-wrapper"
      style={{ "--event-color": event.color }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="video-card-inner">
        <video
          ref={videoRef}
          src={event.video}
          preload="auto"
          onCanPlayThrough={() => setIsVideoLoaded(true)}
          loop
          muted
          playsInline
          className={`event-video ${isHovered && isVideoLoaded ? 'visible' : ''}`}
        />
        <div className={`thumbnail-layer ${isHovered && isVideoLoaded ? 'hidden' : ''}`}>
          <img src={event.thumb} alt="Thumbnail" className="event-thumbnail" />
          <img src={stainedGlassOverlay} alt="Stained Glass" className="stained-glass-overlay" />
        </div>
      </div>
    </div>
  );
};

export default function HeroSection() {
  return (
    <section className="hero">
      
      {/* 🏗️ THE MASTER WRAPPER 
          This forces the roof and grid to share the exact same width */}
      <div className="hero-content-wrapper">
        
        {/* 1. The Architectural Crown (Roof + Title) */}
        <div className="roof-and-heading-container">
          <img src={roofFrame} alt="Roof" className="roof-svg" />
          <div className="hero-header-wrapper">
            <div className="golden-glow-backdrop"></div>
            <img src={heading} alt="Events Heading" className="events-heading" />
          </div>
        </div>

        {/* 2. The Fluid 3x3 Grid */}
        <div className="cinematic-videos-grid">
          {eventsList.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

      </div>

    </section>
  );
}