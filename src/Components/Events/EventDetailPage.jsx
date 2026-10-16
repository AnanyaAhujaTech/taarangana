import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { events } from "../../data/eventsData";
import "./EventDetailPage.css";

export default function EventDetailPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const event = events.find((e) => e.id === eventId);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  if (!event) {
    return (
      <div
        style={{
          background: "#0b0b0e",
          color: "#fff",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <h2>Event Not Found</h2>
        <button onClick={() => navigate("/events")} className="back-to-events-btn">
          Back to Events
        </button>
      </div>
    );
  }

  const antraNotePositions = [
    { top: "22%", left: "21%", depth: 30, size: "55px", rotate: -5 },
    { top: "32%", left: "30%", depth: 25, size: "45px", rotate: -10 },
    { top: "42%", left: "44%", depth: 20, size: "35px", rotate: 5 },
    { top: "30%", left: "56%", depth: 25, size: "40px", rotate: 12 },
    { top: "20%", left: "63%", depth: 30, size: "42px", rotate: -8 },
    { top: "22%", left: "71%", depth: 35, size: "45px", rotate: 10 },
    { top: "15%", left: "78%", depth: 40, size: "50px", rotate: -12 },
  ];

  const renderForegroundAssets = () => {
    if (!event.foregroundAssets || event.foregroundAssets.length === 0) return null;

    switch (event.id) {
      case "antra":
        return event.foregroundAssets.map((asset, index) => {
          const config = antraNotePositions[index % antraNotePositions.length];
          return (
            <img
              key={index}
              src={asset}
              alt="Musical Note"
              className="floating-asset"
              style={{
                top: config.top,
                left: config.left,
                width: config.size,
                height: "auto",
                filter: "drop-shadow(0px 4px 12px rgba(85, 230, 208, 0.4))",
                transform: `translate3d(${mousePos.x * config.depth}px, ${mousePos.y * config.depth}px, 0) rotate(${config.rotate}deg)`,
              }}
            />
          );
        });
      case "rap-battle":
        return (
          <>
            <img
              src={event.foregroundAssets[0]}
              alt="Rap Battle Figure 1"
              className="floating-asset"
              style={{
                top: "55%",
                left: "34%",
                height: "68vh",
                width: "auto",
                transform: `translate3d(calc(-50% + ${mousePos.x * 20}px), calc(-50% + ${mousePos.y * 20}px), 0)`,
                filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.9))",
              }}
            />
            {event.foregroundAssets[1] && (
              <img
                src={event.foregroundAssets[1]}
                alt="Rap Battle Figure 2"
                className="floating-asset"
                style={{
                  top: "55%",
                  left: "67%",
                  height: "68vh",
                  width: "auto",
                  transform: `translate3d(calc(-50% + ${mousePos.x * -20}px), calc(-50% + ${mousePos.y * 20}px), 0)`,
                  filter: "drop-shadow(0px 10px 20px rgba(0,0,0,0.9))",
                }}
              />
            )}
          </>
        );
      case "aaghaz":
        return (
          <img
            src={event.foregroundAssets[0]}
            alt="Aaghaz Group"
            className="floating-asset"
            style={{
              bottom: "4%",
              left: "50%",
              width: "92vw",
              maxHeight: "52vh",
              transform: `translate3d(calc(-50% + ${mousePos.x * 12}px), ${mousePos.y * 12}px, 0)`,
              filter: "drop-shadow(0px 15px 30px rgba(0,0,0,0.95))",
            }}
          />
        );
      case "slam-poetry":
        return (
          <img
            src={event.foregroundAssets[0]}
            alt="Slam Poetry Book"
            className="floating-asset"
            style={{
              top: "56%",
              left: "48%",
              width: "320px",
              height: "auto",
              transform: `translate3d(calc(-50% + ${mousePos.x * 15}px), calc(-50% + ${mousePos.y * 15}px), 0)`,
              filter: "drop-shadow(0px 15px 25px rgba(0,0,0,0.9))",
            }}
          />
        );
      case "lilac-dreams":
        return (
          <img
            src={event.foregroundAssets[0]}
            alt="Lilac Dreams Dress"
            className="floating-asset"
            style={{
              top: "54%",
              left: "77%",
              height: "62vh",
              width: "auto",
              transform: `translate3d(calc(-50% + ${mousePos.x * 14}px), calc(-50% + ${mousePos.y * 14}px), 0)`,
              filter: "drop-shadow(0px 15px 30px rgba(0,0,0,0.9))",
            }}
          />
        );
      case "urban-thump":
        return (
          <img
            src={event.foregroundAssets[0]}
            alt="Urban Thump Group"
            className="floating-asset"
            style={{
              top: "52%",
              left: "67%",
              width: "108vw",
              maxHeight: "92vh",
              transform: `translate3d(calc(-50% + ${mousePos.x * 10}px), calc(-50% + ${mousePos.y * 10}px), 0)`,
              filter: "drop-shadow(0px 20px 40px rgba(0,0,0,0.9))",
            }}
          />
        );
      case "aalap":
        return (
          <img
            src={event.foregroundAssets[0]}
            alt="Aalap Mic"
            className="floating-asset"
            style={{
              top: "20%",
              left: "50%",
              height: "250px",
              width: "auto",
              transform: `translate3d(calc(-50% + ${mousePos.x * 18}px), ${mousePos.y * 18}px, 0)`,
              filter: "drop-shadow(0px 12px 24px rgba(0,0,0,0.8))",
            }}
          />
        );
      case "mr-and-ms-taarangana":
        return (
          <>
            <img
              src={event.foregroundAssets[0]}
              alt="Crown Left"
              className="floating-asset"
              style={{
                top: "12%",
                left: "6%",
                width: "360px",
                height: "auto",
                transform: `translate3d(${mousePos.x * 22}px, ${mousePos.y * 22}px, 0) rotate(-12deg)`,
                filter: "drop-shadow(0px 15px 35px rgba(250,204,21,0.6))",
              }}
            />
            {event.foregroundAssets[1] && (
              <img
                src={event.foregroundAssets[1]}
                alt="Crown Right"
                className="floating-asset"
                style={{
                  top: "12%",
                  right: "6%",
                  width: "360px",
                  height: "auto",
                  transform: `translate3d(${mousePos.x * -22}px, ${mousePos.y * 22}px, 0) rotate(12deg)`,
                  filter: "drop-shadow(0px 15px 35px rgba(250,204,21,0.6))",
                }}
              />
            )}
          </>
        );
      case "rangmanch":
        return (
          <img
            src={event.foregroundAssets[0]}
            alt="Rangmanch Figure"
            className="floating-asset"
            style={{
              top: "16%",
              left: "50%",
              height: "62vh",
              width: "auto",
              transform: `translate3d(calc(-50% + ${mousePos.x * 16}px), ${mousePos.y * 16}px, 0)`,
              filter: "drop-shadow(0px 15px 35px rgba(0,0,0,0.85))",
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="event-detail-page" onMouseMove={handleMouseMove}>
      {/* PINNED PARALLAX BACKGROUND LAYER */}
      <div className="event-parallax-container">
        <div
          className="event-banner-background"
          style={{
            backgroundImage: `url(${event.bannerBg})`,
            backgroundSize: event.bgSize || "cover",
            backgroundPosition: event.bgPosition || "center",
            transform: `translate3d(${mousePos.x * -12}px, ${mousePos.y * -12}px, 0) scale(1.05)`,
          }}
        />
        <div className="event-dark-overlay" />
        <div className="event-assets-layer">{renderForegroundAssets()}</div>
      </div>

      {/* SNAP-SCROLLABLE FRONT CONTENT CONTAINER */}
      <div className="event-scrollable-content">
        {/* FIRST FOLD SCREEN */}
        <div className="event-hero-section">
          {/* Header Bar */}
          <div className="event-header-bar">
            <button onClick={() => navigate("/events")} className="back-to-events-btn">
              ← Back to Events
            </button>
            <span className="event-top-badge" style={{ color: event.rasaColor || "#55e6d1" }}>
              {event.rasa} ({event.emotion}) • {event.eventType}
            </span>
          </div>

          {/* Center Title Badge */}
          <div
            className="event-title-badge-container event-card"
            style={{ "--rasa-color": event.rasaColor || "rgba(255,255,255,0.2)" }}
          >
            <span className="event-badge-label" style={{ color: event.rasaColor || "#55e6d1" }}>
              Event Page
            </span>
            <h1 className="event-banner-title">{event.title}</h1>
          </div>

          {/* Bottom Details Panel on First Fold */}
          <div className="event-details-preview-panel event-card" style={{ "--rasa-color": event.rasaColor || "rgba(255,255,255,0.2)" }}>
            <div>
              <p className="event-preview-desc">{event.description}</p>
              {/* DYNAMIC WHY RASA SECTION */}
              {event.whyText && (
                <div style={{ marginTop: "0.4rem" }}>
                  <span
                    style={{
                      color: event.rasaColor || "#55e6d1",
                      fontSize: "0.85rem",
                      fontWeight: "bold",
                    }}
                  >
                    Why {event.rasa}?
                  </span>
                  <p
                    style={{
                      margin: "0.2rem 0 0.5rem 0",
                      color: "#ccc",
                      fontSize: "0.8rem",
                      lineHeight: "1.3",
                    }}
                  >
                    {event.whyText}
                  </p>
                </div>
              )}
              <div className="event-preview-meta">
                <div>
                  <strong style={{ color: "#fff" }}>Time:</strong> {event.time}
                </div>
                <div>
                  <strong style={{ color: "#fff" }}>Venue:</strong> {event.venue}
                </div>
              </div>
            </div>

            <div className="event-preview-rulebook-container">
              <span className="event-preview-rulebook-title">Rulebook & Guidelines</span>
              <pre className="event-preview-pre">{event.rulebookText}</pre>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <button disabled className="register-btn-disabled">
                Registration Coming Soon
              </button>
            </div>
          </div>
        </div>

        {/* SECOND FOLD / SNAP-SCROLL DETAILED SECTION */}
        {event.aboutText && (
          <div className="event-detailed-info-section">
            <div className="event-detailed-info-inner event-card" style={{ "--rasa-color": event.rasaColor || "rgba(255,255,255,0.2)" }}>
              <h2 style={{ color: event.rasaColor || "#55e6d1" }}>
                {event.title.toUpperCase()} — ABOUT & RULES
              </h2>
              <p style={{ whiteSpace: "pre-line" }}>{event.aboutText}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}