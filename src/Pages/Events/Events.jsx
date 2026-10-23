import { useEffect, useRef, useState } from "react";
import HeroSection from "../../Components/Events/HeroSection";
import RasaSection from "../../Components/Events/RasaSection";
import Galaxy from "../../Components/Events/Galaxy";
import bg from "../../assets/Background_Events.webp";
import musicFile from "../../assets/events.mp3"; // 🟢 Added Audio Import
import SplashCursor from "../../Components/SplashCursor/SplashCursor"; 
import "./Events.css";
import Navbar from '../../Components/Navbar/Navbar';

export default function Events() {
  const rasaRef = useRef(null);
  const timerRef = useRef(null);
  
  // 🟢 Audio control references
  const audioRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // 🟢 Initialize audio volume to 25% so it stays comfortably in the background
    if (audioRef.current) {
      audioRef.current.volume = 0.25;
      // Attempt to play immediately (Browsers often block this until interaction)
      audioRef.current.play().catch(() => console.log("Audio waiting for user interaction..."));
    }

    // Auto scroll after 7 seconds
    timerRef.current = setTimeout(() => {
      rasaRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 7000);

    return () => clearTimeout(timerRef.current);
  }, []);

  // Cancel auto-scroll if the user touches/scrolls manually AND trigger audio
  const handleUserInteraction = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // 🟢 If the browser blocked autoplay, this forces it to start on their first scroll/click
    if (!hasInteracted && audioRef.current) {
      audioRef.current.play().catch(() => {});
      setHasInteracted(true);
    }
  };

  return (
    <div 
      className="events-wrapper"
      onWheel={handleUserInteraction}
      onTouchMove={handleUserInteraction}
      onKeyDown={handleUserInteraction}
      onClick={handleUserInteraction} /* 🟢 Added onClick to catch desktop clicks */
    >
      
      {/* 🟢 Hidden looping audio element */}
      <audio ref={audioRef} src={musicFile} loop />

      <div className="background-image" style={{ backgroundImage: `url(${bg})` }} />

      <div className="galaxy-layer">
        <Galaxy
          density={1} glowIntensity={0.3} saturation={0} hueShift={140}
          twinkleIntensity={0.3} rotationSpeed={0.1} starSpeed={0.5}
          speed={1} transparent={true}
        />
      </div>

      {/* NEW: Splash Cursor Layer */}
      <div className="splash-cursor-layer">
        <SplashCursor />
      </div>

      <div className="navbar-fixed">
        <Navbar isVisible={true} />
      </div>

      <div className="content-layer">
        <HeroSection />
        <div ref={rasaRef}>
          <RasaSection />
        </div>
      </div>

    </div>
  );
}