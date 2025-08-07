import React from 'react';

const LandingHeader = () => {
  const headerStyle = {
    height: '100vh', // full viewport height for immersion
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: '#fff',
    padding: '0 20px',
    backgroundImage: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // dark overlay for contrast
    zIndex: 1,
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 2,
    maxWidth: '800px',
  };

  const titleStyle = {
    fontSize: '4rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const subtitleStyle = {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    fontWeight: '300',
  };

  const buttonStyle = {
    padding: '12px 30px',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '30px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const handleButtonHover = (e) => {
    e.target.style.backgroundColor = '#0056b3';
  };

  const handleButtonLeave = (e) => {
    e.target.style.backgroundColor = '#007bff';
  };

  return (
    <header style={headerStyle}>
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <h1 style={titleStyle}>Welcome to Our Amazing Site</h1>
        <p style={subtitleStyle}>
          Discover immersive experiences and grow with us.
        </p>
        <button
          style={buttonStyle}
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonLeave}
          onClick={() => alert('Get Started clicked!')}
        >
          Get Started
        </button>
      </div>
    </header>
  );
};

export default LandingHeader;
