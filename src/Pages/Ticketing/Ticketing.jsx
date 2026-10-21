import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Vortex } from '../../Components/Vortex/Vortex'; 
import Navbar from '../../Components/Navbar/Navbar';
import './Ticketing.css';

export default function Ticketing() {
  const [email, setEmail] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsVerifying(true);
    
    // Fake database verification delay
    setTimeout(() => {
      setIsVerifying(false);
      setIsVerified(true);
    }, 2000);
  };

  return (
    <div className="ticketing-root">
      <Navbar isVisible={true} />
      
      {/* Background Vortex */}
      <Vortex 
        particleCount={350} 
        baseHue={260} 
        rangeHue={60} 
        backgroundColor="#05000a" 
      />

      {/* Main Content Area with Frosted Glass */}
      <div className="ticketing-glass-container">
        
        <h1 className="ticketing-main-title">Fest Entry Guidelines</h1>

        {/* --- SECTION 1: PROHIBITED ITEMS --- */}
        <section className="ticketing-section">
          <h2 className="ticketing-section-title">Prohibited Items</h2>
          <p className="ticketing-intro-text">The following items are strictly prohibited within the IGDTUW Campus:</p>
          
          <ol className="ticketing-list">
            <li><strong>Bags and Handbags:</strong> No handbags, backpacks, purses, sling bags, tote bags, or other bags are permitted. Only small pocket wallets are allowed.</li>
            <li><strong>Personal Care and Cosmetic Products:</strong> Sanitizers, perfumes, deodorants, body sprays, makeup products (including lipstick, lip gloss, mascara, foundation, compact powder, and similar items), and other personal care products are not permitted.</li>
            <li><strong>Bottles and Containers:</strong> Outside water bottles, flasks, tumblers, and other liquid containers are prohibited. Water coolers and bottled drinking water will be available inside the venue.</li>
            <li><strong>Alcohol, Tobacco and Drugs:</strong> Liquor, alcoholic beverages, cigarettes, cigars, vapes, e-cigarettes, tobacco products, narcotic substances, and all illegal drugs or intoxicants are strictly prohibited.</li>
            <li><strong>Weapons and Dangerous Objects:</strong> Firearms, ammunition, knives, blades, sharp objects, explosives, fireworks, lighters, matchboxes, and any item that may pose a safety risk are prohibited.</li>
          </ol>

          <div className="ticketing-warning-blocks">
            <p>No lockers are available.</p>
            <p>Misbehaviour, harassment, fighting, or failure to comply with security instructions will not be tolerated.</p>
            <p>Violation of the rules may result in denial of entry, revocation of your invitation/ticket, or removal from the venue. No exceptions.</p>
            <p>Please read the complete Rules & Regulations before arriving. Entry is subject to security clearance and compliance with all fest policies.</p>
          </div>
        </section>

        <hr className="ticketing-divider" />

        {/* --- SECTION 2: REQUIRED ITEMS --- */}
        <section className="ticketing-section">
          <h2 className="ticketing-section-title">Required Documents</h2>
          <p className="ticketing-intro-text highlight-text">ALL ATTENDEES MUST CARRY THE FOLLOWING THREE ITEMS FOR ENTRY INTO THE FEST:</p>
          
          <ul className="ticketing-list bullet-list">
            <li><strong>College ID Card</strong> — A valid college identity card for verification.</li>
            <li><strong>[Aadhaar Redacted] Card</strong> — An original, valid [Aadhaar Redacted] card for identity verification.</li>
            <li><strong>Fest E-Ticket</strong> — Your registered fest e-ticket with a scannable QR code, accessible on your phone or as a printed copy.</li>
          </ul>

          <div className="ticketing-alert-box">
            <strong>IMPORTANT:</strong> Failure to present the required identification documents and a valid fest e-ticket QR code may result in denial of entry. All documents and tickets are subject to verification by the organising committee and security personnel.
          </div>
        </section>

        <hr className="ticketing-divider" />

        {/* --- SECTION 3: PRE-REGISTRATION TASKS --- */}
        <section className="ticketing-section center-aligned">
          <h2 className="ticketing-section-title">Pre-Registration Tasks</h2>
          <p className="ticketing-task-desc">
            The tasks in the following Google Form must be completed <strong>before</strong> you can register for passes. 
            All passes are subject to manual approval and will be rejected if the tasks are incomplete. 
            <strong>Screenshot proofs of the completed tasks will also be checked at the entry gate.</strong>
          </p>
          
          <a 
            href="https://forms.gle/9v8Z3LRoTbV8Y9Tv9" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="ticketing-task-btn"
          >
            Complete Tasks Form
          </a>
        </section>

        {/* --- SECTION 4: VERIFICATION & FINAL REGISTRATION --- */}
        <section className="ticketing-verification-section">
          <h3 className="verification-title">Verify Task Completion</h3>
          <p className="verification-desc">Enter the email ID you used to fill out the Tasks Form above.</p>
          
          <form className="verification-form" onSubmit={handleVerify}>
            <input 
              type="email" 
              className="verification-input" 
              placeholder="Enter your email ID" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              disabled={isVerifying || isVerified}
            />
            {!isVerified && (
              <button 
                type="submit" 
                className="verification-submit-btn"
                disabled={isVerifying || !email}
              >
                {isVerifying ? 'Checking...' : 'Submit'}
              </button>
            )}
          </form>

          {isVerifying && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Please wait...</p>
            </div>
          )}

          {isVerified && (
            <div className="success-container slide-down">
              <div className="success-icon">✓</div>
              <p className="success-text">Response recorded. Passes will be subject to manual Verification.</p>
              <p className="proceed-text">Please proceed to final registration:</p>
              
              <a 
                href="https://taarangana.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="final-registration-btn"
              >
                Get Passes Now
              </a>
            </div>
          )}
        </section>

        {/* --- RETURN TO HOME BUTTON --- */}
        <div className="ticketing-footer-actions">
          <button 
            className="ticketing-home-btn"
            onClick={() => navigate('/')}
          >
            Return to Home
          </button>
        </div>

      </div>
    </div>
  );
}