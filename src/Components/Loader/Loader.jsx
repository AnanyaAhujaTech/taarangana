import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// 🟢 The ?url tells Vite to treat this custom extension as a static asset
import rangoliUrl from '../../assets/Rangoli.lottie?url'; 
import './Loader.css';

export default function Loader({ isLoading }) {
  if (!isLoading) return null;

  return (
    <div className="global-loader-overlay">
      <div className="lottie-container">
        <DotLottieReact 
          src={rangoliUrl}
          loop={true}
          autoplay={true}
        />
      </div>
      <h2 className="loading-text">Loading Taarangana...</h2>
    </div>
  );
}