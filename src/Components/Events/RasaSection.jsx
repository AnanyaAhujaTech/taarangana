import { useNavigate } from "react-router-dom";
import { events } from "../../data/eventsData";
import "./RasaSection.css";

export default function RasaComponent() {
  const navigate = useNavigate();

  const handleMouseEnter = (pageUrl) => {
    if (pageUrl) {
      const img = new Image();
      img.src = pageUrl;
    }
  };

  return (
    <div className="rasa-container">
      <div className="rasa-header">
        <h1 className="rasa-title">The Nine <span>Rasas</span></h1>
        <p className="rasa-subtitle">Each event embodies one of the nine classical emotions — discover the essence that resonates with your soul</p>
      </div>

      <div className="rasa-grid">
        {events.map((e) => (
          <button
            key={e.id}
            className="rasa-card"
            style={{
              "--rasa-color": e.rasaColor,
              backgroundImage: e.cardBg ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${e.cardBg})` : undefined,
              backgroundSize: e.bgSize || "cover",
              backgroundPosition: e.bgPosition || "center",
              backgroundRepeat: "no-repeat",
              textShadow: "0px 2px 4px rgba(0,0,0,0.9)"
            }}
            onMouseEnter={() => handleMouseEnter(e.bannerBg)}
            onClick={() => navigate(`/events/${e.id}`)}
          >
            <h3 className="rasa-card-title">{e.title}</h3>
            <p className="rasa-card-rasa">{e.rasa} · {e.emotion}</p>
            <p className="rasa-card-desc">{e.eventType} – {e.description}</p>
            <div className="rasa-card-meta">
              <span>{e.time}</span>
              <span>{e.venue}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}