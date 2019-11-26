/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useEffect } from "react";
import "./Header.css";
import HeaderIcon from './img/baseline_menu_white_18dp.png';
import { Link } from 'react-router-dom';
import { CSSTransition } from "react-transition-group";

export default function Header() {
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 100vw)");
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = mediaQuery => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  return (
    <header className="Header">
        <h3 className="navbar-heading">React D3 Charts</h3>
      <CSSTransition
        in={!isSmallScreen || isNavVisible}
        timeout={350}
        classNames="NavAnimation"
        unmountOnExit
      >
        <nav className="Nav">
            <Link 
                to={"/"}
                style={{ textDecoration: 'none' }}
                onClick={toggleNav}
            >
                Pie Chart
            </Link>
            <Link 
                to={"/barchart"}
                style={{ textDecoration: 'none' }}
                onClick={toggleNav}
            >
                Bar Chart
            </Link>
            <Link 
                to={"/chordchart"}
                style={{ textDecoration: 'none' }}
                onClick={toggleNav}
            >
                Chord Chart
            </Link>
            <Link 
                to={"/areachart"}
                style={{ textDecoration: 'none' }}
                onClick={toggleNav}
            >
                Area Chart
            </Link>
        </nav>
      </CSSTransition>
      <button onClick={toggleNav} className="header-button">
        <img 
            src={HeaderIcon} 
            alt="HeaderIcon"
        />
      </button>
    </header>
  );
}