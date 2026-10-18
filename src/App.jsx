import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './Pages/Home/Home';
import ItineraryPage from './Pages/Itinerary/Itinerary';
import TeamPage from './Pages/Team/Team';
import Events from './Pages/Events/Events';
import Sponsi from './Pages/Sponsi/Sponsi';
import EventDetailPage from './Components/Events/EventDetailPage';

import './index.css';

// 1. Existing Team preloader
const teamAssets = import.meta.glob('./assets/page1.webp', { eager: true, import: 'default' });

// 2. Automatically fetch your Event Thumbnail images (1.png through 9.png)
const eventThumbnails = import.meta.glob('./assets/[1-9].png', { eager: true, import: 'default' });

function App() {
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
  }, []);

  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:eventId" element={<EventDetailPage />} />
          <Route path="/schedule" element={<ItineraryPage />} />
          <Route path="/sponsi" element={<Sponsi />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;