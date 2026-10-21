import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Ticketing.css';

export default function Ticketing() {
  const navigate = useNavigate();

  return (
    <div className="ticketing-container">
      <div className="ticketing-content">
        <h1 className="ticketing-title">Ticketing Coming Soon</h1>
        <p className="ticketing-subtitle">We are currently preparing the portal.</p>
        
        <button 
          className="ticketing-back-btn" 
          onClick={() => navigate('/')}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}