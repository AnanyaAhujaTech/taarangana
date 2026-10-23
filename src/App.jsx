import React, { useEffect, useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import HomePage from './Pages/Home/Home';
import ItineraryPage from './Pages/Itinerary/Itinerary';
import TeamPage from './Pages/Team/team';
import Events from './Pages/Events/Events';
import Sponsi from './Pages/Sponsi/Sponsi';
import EventDetailPage from './Components/Events/EventDetailPage';
import Ticketing from './Pages/Ticketing/Ticketing';

// 🟢 Import your new Loader
import Loader from './Components/Loader/Loader'; 

import './index.css';

// 1. Existing Team preloader
const teamAssets = import.meta.glob('./assets/page1.webp', { eager: true, import: 'default' });

// 2. Automatically fetch your Event Thumbnail images (1.png through 9.png)
const eventThumbnails = import.meta.glob('./assets/[1-9].png', { eager: true, import: 'default' });

// 🟢 SUB-COMPONENT: Tracks route changes to trigger the loading screen
function RouteChangeTracker({ setIsLoading }) {
  const location = useLocation();

  useEffect(() => {
    // Fire the loader when the route changes
    setIsLoading(true);
    
    // Hide it after a short delay (adjust time as needed)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200); 

    return () => clearTimeout(timer);
  }, [location.pathname, setIsLoading]);

  return null; // This component doesn't render anything visible
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 🟢 PRELOAD TEAM PAGE
    const firstPagePath = Object.keys(teamAssets)[0];
    if (firstPagePath) {
      const img = new Image();
      img.src = teamAssets[firstPagePath];
    }

    // 🟢 SILENT PRELOAD EVENT THUMBNAILS
    Object.values(eventThumbnails).forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // 🟢 INITIAL SITE LOAD ANIMATION DELAY
    const initialTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); 
    
    return () => clearTimeout(initialTimer);
  }, []);

  return (
    <HashRouter>
      <div className="App">
        
        {/* 🟢 GLOBAL LOADER: Placed outside Routes so it covers the whole screen */}
        <Loader isLoading={isLoading} />
        
        {/* 🟢 TRACKER: Listens for URL changes to show the loader */}
        <RouteChangeTracker setIsLoading={setIsLoading} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventId" element={<EventDetailPage />} />
          <Route path="/schedule" element={<ItineraryPage />} />
          <Route path="/sponsi" element={<Sponsi />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/ticketing" element={<Ticketing />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;