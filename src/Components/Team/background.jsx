import React, { useEffect, useRef } from 'react';
import './background.css';

// copies = tiles in the strip (4 is enough: 1 screen + 2 for the mirrored period + spare)
// loopCopies = how many times the page repeats its content (must match team.jsx)
export default function Background({
  imagePath, scrollRef, copies = 4, loopCopies = 3, parallax = 0.35, mirror = true,
}) {
  const stripRef = useRef(null);

  useEffect(() => {
    const scroller = scrollRef?.current;
    const strip = stripRef.current;
    if (!scroller || !strip) return;

    let last = scroller.scrollLeft;
    let offset = 0;

    const apply = () => {
      const w = strip.parentElement.clientWidth;
      const period = mirror ? w * 2 : w;
      const x = ((offset % period) + period) % period;
      strip.style.transform = `translate3d(${-x}px, 0, 0)`;
    };

    const onScroll = () => {
      const loop = scroller.scrollWidth / loopCopies;
      let d = scroller.scrollLeft - last;
      last = scroller.scrollLeft;
      // ignore the artificial jump when the carousel wraps around
      if (d > loop / 2) d -= loop;
      else if (d < -loop / 2) d += loop;
      offset += d * parallax;
      apply();
    };

    apply();
    scroller.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', apply);
    return () => {
      scroller.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', apply);
    };
  }, [scrollRef, copies, loopCopies, parallax, mirror]);

  return (
    <div className="team-fixed-background">
       <div ref={stripRef} className="team-background-strip" style={{ width: `${copies * 100}%` }}>
        {Array.from({ length: copies }).map((_, i) => (
          <div
            key={i}
            className="team-background-tile"
            style={{
              backgroundImage: `url(${imagePath})`,
              transform: mirror && i % 2 === 1 ? 'scaleX(-1)' : 'none',
            }}
          />
        ))}
      </div>
    </div>
  );
}