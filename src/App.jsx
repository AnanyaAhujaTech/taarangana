import React, { useEffect, useState, useRef } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import HomePage from './Pages/Home/Home';
import ItineraryPage from './Pages/Itinerary/Itinerary';
import TeamPage from './Pages/Team/team';
import Events from './Pages/Events/Events';
import Sponsi from './Pages/Sponsi/Sponsi';
import EventDetailPage from './Components/Events/EventDetailPage';
import Ticketing from './Pages/Ticketing/Ticketing';

import Loader from './Components/Loader/Loader'; 
import './index.css';

// 🟢 GLOBAL AUDIO IMPORTS
import traditionalMusic from './assets/home.mp3'; 
import modernMusic from './assets/events.mp3';

const teamAssets = import.meta.glob('./assets/page1.webp', { eager: true, import: 'default' });
const eventThumbnails = import.meta.glob('./assets/[1-9].png', { eager: true, import: 'default' });

// Tracks route changes to trigger the loading screen
function RouteChangeTracker({ setIsLoading }) {
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); 

    return () => clearTimeout(timer);
  }, [location.pathname, setIsLoading]);

  return null; 
}

// 🟢 INNER APP COMPONENT (Handles Global Audio & Routing)
function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [audioStarted, setAudioStarted] = useState(false);
  const location = useLocation();

  const tradAudioRef = useRef(null);
  const modernAudioRef = useRef(null);

  useEffect(() => {
    const firstPagePath = Object.keys(teamAssets)[0];
    if (firstPagePath) {
      const img = new Image();
      img.src = teamAssets[firstPagePath];
    }
    Object.values(eventThumbnails).forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const initialTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
    
    return () => clearTimeout(initialTimer);
  }, []);

  // 🟢 AGGRESSIVE GLOBAL INTERACTION CATCHER
  const handleGlobalInteraction = () => {
    if (!audioStarted) {
      setAudioStarted(true);
      // If they are on home, play traditional. If anywhere else, play modern.
      if (location.pathname === '/') {
        if (tradAudioRef.current) {
          tradAudioRef.current.volume = 0.4;
          tradAudioRef.current.play().catch(() => {});
        }
      } else {
        if (modernAudioRef.current) {
          modernAudioRef.current.volume = 0.5;
          modernAudioRef.current.play().catch(() => {});
        }
      }
    }
  };

  // 🟢 ROUTE CHANGE AUDIO LOGIC
  useEffect(() => {
    // If the user navigates away from the home page, force the modern music track
    if (location.pathname !== '/') {
      if (tradAudioRef.current) tradAudioRef.current.pause();
      if (modernAudioRef.current && audioStarted) {
        modernAudioRef.current.volume = 0.5;
        modernAudioRef.current.play().catch(() => {});
      }
    }
  }, [location.pathname, audioStarted]);

  return (
    <div 
      className="App"
      onClick={handleGlobalInteraction}
      onTouchStart={handleGlobalInteraction}
      onKeyDown={handleGlobalInteraction}
      onWheel={handleGlobalInteraction}
    >
      {/* 🟢 THE PERSISTENT AUDIO ELEMENTS */}
      <audio ref={tradAudioRef} src={traditionalMusic} loop />
      <audio ref={modernAudioRef} src={modernMusic} loop />

      <Loader isLoading={isLoading} />
      <RouteChangeTracker setIsLoading={setIsLoading} />

      <Routes>
        {/* Pass the audio refs down to HomePage -> HomeComp1 */}
        <Route path="/" element={
          <HomePage 
            tradAudioRef={tradAudioRef} 
            modernAudioRef={modernAudioRef} 
            audioStarted={audioStarted} 
            setAudioStarted={setAudioStarted} 
          />
        } />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:eventId" element={<EventDetailPage />} />
        <Route path="/schedule" element={<ItineraryPage />} />
        <Route path="/sponsi" element={<Sponsi />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/ticketing" element={<Ticketing />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}