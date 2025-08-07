import React, { useState, useEffect, useRef } from 'react';
import paul from '../assets/Paul.png';
import teach from '../assets/teach.jpg';
import impact from '../assets/impact.jpg';

const floatingCircles = [
  { id: 0, size: 69, leftPercent: 61, topPercent: 80, direction: 'leftRight' },
  { id: 1, size: 34, leftPercent: 13, topPercent: 70, direction: 'upDown' },
  { id: 2, size: 31, leftPercent: 89, topPercent: 75, direction: 'upDown' },
  { id: 3, size: 34, leftPercent: 18, topPercent: 90, direction: 'leftRight' },
  { id: 4, size: 55, leftPercent: 5, topPercent: 85, direction: 'leftRight' },
  { id: 5, size: 48, leftPercent: 37, topPercent: 80, direction: 'leftRight' },
];

const floatingCubes = [
  { id: 10, size: 50, leftPercent: 25, topPercent: 60, direction: 'upDown' },
  { id: 11, size: 40, leftPercent: 70, topPercent: 65, direction: 'leftRight' },
  { id: 12, size: 45, leftPercent: 50, topPercent: 55, direction: 'upDown' },
  { id: 13, size: 35, leftPercent: 85, topPercent: 80, direction: 'leftRight' },
  { id: 14, size: 30, leftPercent: 15, topPercent: 65, direction: 'upDown' },
];

const BOUNCE_DISTANCE = 100; // pixels - max distance pointer affects bounce
const BOUNCE_STRENGTH = 20;  // pixels - max bounce displacement

// Hook to detect if an element is visible in the viewport
const useOnScreen = (ref, rootMargin = '0px') => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { rootMargin }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, rootMargin]);

  return isIntersecting;
};

const FounderProfile = () => {
  const containerRef = useRef(null);
  const impactRef = useRef(null);
  const teachesRef = useRef(null);

  const isImpactVisible = useOnScreen(impactRef, '-100px');   // triggers a bit before fully visible
  const isTeachesVisible = useOnScreen(teachesRef, '-100px');

  const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 }); // offscreen initially

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    const handleMouseLeave = () => {
      setMousePos({ x: -9999, y: -9999 });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const calculateBounceOffset = (x, y) => {
    const dx = mousePos.x - x;
    const dy = mousePos.y - y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < BOUNCE_DISTANCE) {
      const normX = dx / distance;
      const normY = dy / distance;
      const distanceFactor = (BOUNCE_DISTANCE - distance) / BOUNCE_DISTANCE;
      return {
        x: -normX * BOUNCE_STRENGTH * distanceFactor,
        y: -normY * BOUNCE_STRENGTH * distanceFactor,
      };
    }
    return { x: 0, y: 0 };
  };

  const containerStyle = {
    maxWidth: '900px',
    margin: '4rem auto',
    padding: '2rem',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    color: '#222',
    lineHeight: 1.6,
    position: 'relative',
    overflow: 'hidden',
    zIndex: 1,
    display: 'flex',
    gap: '1.5rem',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  };

  const imageContainerStyle = {
    flexShrink: 0,
    width: '180px',
    height: '180px',
    borderRadius: '50%',
    overflow: 'hidden',
    boxShadow: '0 8px 15px rgba(0,0,0,0.15)',
    cursor: 'pointer',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  };

  const contentStyle = {
    flex: '1 1 400px',
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: '700',
    marginBottom: '0.5rem',
    color: '#007bff',
    textShadow: '1px 1px 2px rgba(0,0,0,0.15)',
  };

  const subtitleStyle = {
    fontSize: '1.2rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    color: '#444',
    fontStyle: 'italic',
  };

  const paragraphStyle = {
    marginBottom: '1rem',
    fontSize: '1rem',
    lineHeight: 1.7,
  };

  const containerWidth = 900;
  const containerHeight = 300;

  const commonFloatingStyle = {
    position: 'absolute',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    zIndex: 0,
  };

  const renderCircles = floatingCircles.map(({ id, size, leftPercent, topPercent, direction }) => {
    const baseX = (leftPercent / 100) * containerWidth;
    const baseY = (topPercent / 100) * containerHeight;
    const bounce = calculateBounceOffset(baseX, baseY);

    return (
      <div
        key={id}
        style={{
          ...commonFloatingStyle,
          left: baseX + bounce.x,
          top: baseY + bounce.y,
          width: size,
          height: size,
          backgroundColor: 'rgba(0, 123, 255, 0.2)',
          borderRadius: '50%',
          animationName: direction === 'upDown' ? 'floatUpDown' : 'floatLeftRight',
          animationDuration: `${5 + id}s`,
        }}
        aria-hidden="true"
      />
    );
  });

  const renderCubes = floatingCubes.map(({ id, size, leftPercent, topPercent, direction }) => {
    const baseX = (leftPercent / 100) * containerWidth;
    const baseY = (topPercent / 100) * containerHeight;
    const bounce = calculateBounceOffset(baseX, baseY);

    return (
      <div
        key={id}
        style={{
          ...commonFloatingStyle,
          left: baseX + bounce.x,
          top: baseY + bounce.y,
          width: size,
          height: size,
          backgroundColor: 'rgba(0, 123, 255, 0.15)',
          boxShadow:
            'inset -3px -3px 6px rgba(255,255,255,0.7), inset 3px 3px 6px rgba(0,0,0,0.15)',
          borderRadius: '8px',
          animationName: direction === 'upDown' ? 'floatUpDown' : 'floatLeftRight',
          animationDuration: `${6 + id}s`,
          transformStyle: 'preserve-3d',
          transformOrigin: 'center',
        }}
        aria-hidden="true"
      />
    );
  });

  // Base styles for cards with common transition, will combine with background & color styles
  const cardBaseStyle = {
    borderRadius: '10px',
    padding: '1rem 1.5rem',
    flex: '1 1 300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'opacity 0.6s ease-out, transform 0.6s ease-out, box-shadow 0.3s ease',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    opacity: 0,
    transform: 'translateX(0)', // Will change dynamically
  };

  return (
    <section
      aria-labelledby="founder-title"
      style={{ position: 'relative', padding: '4rem 1rem', minHeight: '500px' }}
      ref={containerRef}
    >
      {/* Floating shapes */}
      {renderCircles}
      {renderCubes}

      <div style={containerStyle}>
        <div style={imageContainerStyle} aria-label="Paulmicheal Rowland Portrait">
          <img src={paul} alt="Paulmicheal Rowland" style={imageStyle} />
        </div>
        <div style={contentStyle}>
          <h2 id="founder-title" style={titleStyle}>
            Meet Paulmicheal Rowland
          </h2>
          <p style={subtitleStyle}>
            Founder, Creditor Academy | Business Credit Architect | Sovereignty Strategist
          </p>
          <p style={paragraphStyle}>
            Paulmicheal Rowland is the founder of Creditor Academy, a results-driven platform empowering individuals to build profitable businesses, master credit, and reclaim financial sovereignty—without using personal savings or relying on gatekeepers.
          </p>
          <p style={paragraphStyle}>
            With deep expertise in business credit, personal credit repair, and private wealth systems, he’s helped thousands secure $10K–$50K+ in business credit (often with no personal guarantee) and eliminate over $1.27B in consumer debt across his community.
          </p>

          {/* Cards with scroll animation & hover */}
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              marginTop: '2rem',
              flexWrap: 'wrap',
            }}
          >
            {/* Impact Card */}
            <div
              ref={impactRef}
              style={{
                ...cardBaseStyle,
                background: '#f0f8ff',
                color: '#004085',
                boxShadow: isImpactVisible
                  ? '0 8px 20px rgba(0,123,255,0.3)'
                  : cardBaseStyle.boxShadow,
                opacity: isImpactVisible ? 1 : 0,
                transform: isImpactVisible ? 'translateX(0)' : 'translateX(-50px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,123,255,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = isImpactVisible
                  ? 'translateX(0)'
                  : 'translateX(-50px)';
                e.currentTarget.style.boxShadow = isImpactVisible
                  ? '0 8px 20px rgba(0,123,255,0.3)'
                  : cardBaseStyle.boxShadow;
              }}
              aria-label="His Impact section"
            >
              <h3
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  textAlign: 'center',
                }}
              >
                His Impact
              </h3>
              <img
                src={impact}
                alt="His Impact"
                style={{
                  width: '100%',
                  maxHeight: '150px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                }}
              />
              <ul
                style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '1rem', lineHeight: 1.5 }}
              >
                <li>Helped clients launch income-generating businesses using credit, not capital</li>
                <li>Trained hundreds to operate privately via trusts, PMAs & private entities</li>
                <li>Guided individuals through legal status correction and private living</li>
              </ul>
            </div>

            {/* What He Teaches Card */}
            <div
              ref={teachesRef}
              style={{
                ...cardBaseStyle,
                background: '#e9f7ef',
                color: '#155724',
                boxShadow: isTeachesVisible
                  ? '0 8px 20px rgba(40,167,69,0.3)'
                  : cardBaseStyle.boxShadow,
                opacity: isTeachesVisible ? 1 : 0,
                transform: isTeachesVisible ? 'translateX(0)' : 'translateX(50px)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(40,167,69,0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = isTeachesVisible
                  ? 'translateX(0)'
                  : 'translateX(50px)';
                e.currentTarget.style.boxShadow = isTeachesVisible
                  ? '0 8px 20px rgba(40,167,69,0.3)'
                  : cardBaseStyle.boxShadow;
              }}
              aria-label="What He Teaches section"
            >
              <h3
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  marginBottom: '1rem',
                  textAlign: 'center',
                }}
              >
                🧠 What He Teaches
              </h3>
              <img
                src={teach}
                alt="What He Teaches"
                style={{
                  width: '100%',
                  maxHeight: '150px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  marginBottom: '1rem',
                }}
              />
              <ul
                style={{ margin: 0, paddingLeft: '1.2rem', fontSize: '1rem', lineHeight: 1.5 }}
              >
                <li>Business Credit Mastery: Access high-limit credit lines without personal guarantees</li>
                <li>Personal Credit Repair: Clean up and rebuild your credit the smart way</li>
                <li>Become Private: Shift legal status, file SPCs, and reclaim sovereignty</li>
                <li>Operate Private: Run businesses through trusts & private contracts</li>
                <li>Business-in-a-Box Coaching: Launch-ready businesses in days</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style>{`
        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes floatLeftRight {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(20px); }
        }
      `}</style>
    </section>
  );
};

export default FounderProfile;
