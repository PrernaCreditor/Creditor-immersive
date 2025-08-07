import React from 'react';

const FounderProfile = () => {
  const containerStyle = {
    maxWidth: '900px',
    margin: '3rem auto',
    padding: '2rem',
    background: '#fff',
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#222',
    lineHeight: 1.6,
  };

  const titleStyle = {
    fontSize: '2.25rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#007bff', // a subtle accent color
  };

  const subtitleStyle = {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    color: '#444',
    fontStyle: 'italic',
  };

  const paragraphStyle = {
    marginBottom: '1rem',
    fontSize: '1rem',
  };

  return (
    <section style={containerStyle} aria-labelledby="founder-title">
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
    </section>
  );
};

export default FounderProfile;
