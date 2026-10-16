import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './Pages/Home/Home';
import ItineraryPage from './Pages/Itinerary/Itinerary';
import TeamPage from './Pages/Team/Team';
import Events from './Pages/Events/Events';
import Sponsi from './Pages/Sponsi/Sponsi';
import EventDetailPage from './Components/Events/EventDetailPage';

import './index.css';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<Events />} />
          
          {/* 1. Dynamic Event Detail Route */}
          <Route path="/events/:eventId" element={<EventDetailPage />} />

          <Route path="/schedule" element={<ItineraryPage />} />
          <Route path="/sponsi" element={<Sponsi />} />
          <Route path="/team" element={<TeamPage />} />

          {/* Catch-all redirect back to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;