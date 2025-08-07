import React from 'react';

export const Navbar = () => {
  const navbarStyle = {
    width: '100%', // changed from '100vw'
    boxSizing: 'border-box', // include padding in width calculation
    position: 'fixed',
    top: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px 40px',
    background: 'rgba(255,255,255,0.8)', // semi-transparent
    backdropFilter: 'blur(2px)',
    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
    zIndex: 1000,
    fontFamily: "'Inter', sans-serif",
  };

  const logoTextStyle = {
    fontSize: '2rem',
    fontFamily: "'Cursive', cursive",
    color: '#1a1a1a',
  };

  const navbarLinksStyle = {
    listStyle: 'none',
    display: 'flex',
    gap: '2rem',
    margin: 0,
    padding: 0,
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#232323',
    fontSize: '1rem',
    fontWeight: 500,
    transition: 'color 0.2s',
  };

  return (
    <nav style={navbarStyle}>
      <div style={logoTextStyle}>Creditor</div>
      <ul style={navbarLinksStyle}>
        <li><a href="#" style={linkStyle}>Work</a></li>
        <li><a href="#" style={linkStyle}>About</a></li>
        <li><a href="#" style={linkStyle}>Contact</a></li>
      </ul>
    </nav>
  );
};
