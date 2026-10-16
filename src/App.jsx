import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './Pages/Home/Home';
import ItineraryPage from './Pages/Itinerary/Itinerary';
import TeamPage from './Pages/Team/Team';
import Events from './Pages/Events/Events';
import Sponsi from './Pages/Sponsi/Sponsi';

import './index.css';

// Safely grab the first page without crashing if it doesn't exist yet
const teamAssets = import.meta.glob('./assets/page1.webp', { eager: true, import: 'default' });

function App() {
  useEffect(() => {
    // 🟢 SILENT PRELOAD: Downloads the first Team page in the background 
    // as soon as the app opens, so it's instantly cached before they visit the route.
    const firstPagePath = Object.keys(teamAssets)[0];
    if (firstPagePath) {
      const img = new Image();
      img.src = teamAssets[firstPagePath];
    }
  }, []);

  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<Events />} />
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