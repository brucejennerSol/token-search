'use client';
 
import { useEffect, useState } from 'react';
import SignUp from './SignUp';

function MainLayout() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);

    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkScreenSize);

    checkScreenSize();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  const imageStyle = isSmallScreen
    ? { transform: 'none' }
    : {
        opacity: 1,
        transform: `
          perspective(1700px)
          translateX(${Math.max(-93.5913 + scrollPosition * 0.2, 0)}px)
          translateY(${Math.max(-220.169 + scrollPosition * 0.9, 0)}px)
          scale(${Math.max(1 - scrollPosition * 0.002, 0.4)})
          rotate(0deg)
          rotateX(${Math.max(58 - scrollPosition * 0.1, 0)}deg)
          rotateY(0deg)
          skewX(0deg)
          skewY(0deg)
        `,
        transition: 'transform 0.3s ease-out',
      };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 30px',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.001)',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.0002)',
        }}
      >
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', flexDirection: 'row' }}>
          <img src="/img/logo.png" alt="Logo" style={{ height: '32px', margin: '20px' }} />
          <h1 style={{ fontSize: '28px', marginBottom: '10px', marginTop: '20px', fontFamily: 'system-ui' }}>
            SOLERA
          </h1>
        </div>

        <button
          style={{
            padding: '10px 20px',
            backgroundColor: 'transparent',
            color: 'white',
            border: '1px solid lightgray',
            borderRadius: '7px',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Download coming soon...
        </button>
      </nav>

      <div style={{ paddingTop: '150px', textAlign: 'center' }}>
        <p
          style={{
            fontSize: '90px',
            color: 'white',
            marginBottom: '5rem',
            margin: '20px',
            fontWeight: '900',
            fontFamily: 'system-ui',
          }}
        >
          THE TRADERS WALLET POWERING THE BULLRUN
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '10px 0px',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <img
            src="/img/wallet.png"
            alt="Description of Image"
            style={{
              width: '50%',
              height: '100%',
              marginTop: '-405px',
              ...imageStyle,
            }}
          />
          <div
            style={{
              width: `${Math.min(scrollPosition / 2, 50)}%`,
              overflow: 'hidden',
              transition: 'width 0.3s ease-out',
              marginTop: '350px',
              display: "flex",
              flexDirection: "column",
            }}
          >
            <p
              style={{
                fontSize: '50px',
                color: 'white',
                marginBottom: '200px',
                fontFamily: 'system-ui',
                fontWeight: '700',
                marginRight:'200px',
              }}
            >
              Be part of the new era of sol
            </p>
            <SignUp />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
