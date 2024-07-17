import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import './NavBar.css';
import { useMediaQuery } from 'react-responsive';
import { useCookies } from "react-cookie";


function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(location.pathname);

  const [cookies] = useCookies(['JSESSIONID']);

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const onClickHome = () => {
    setActiveButton('/');
    navigate('/');
  };

  const onClickArchive = () => {
    console.log('cookies: ', cookies);
    if (!cookies) {
      console.log("You don't have the cookie!");
    }
    setActiveButton('/archive');
    navigate('/archive');
  };

  const onClickLogin = () => {
    setActiveButton('/signin');
    navigate('/signin');
  };

  return (
    <nav className="NavBar--container">
      <div className="NavBar--logo-wrap">
        <img 
          src={require("../../assets/final-logo-1.png")} 
          alt="logo" 
        />
      </div>
      {/* <div className="NavBar--logo-wrap" onClick={() => navigate('/')}>
        로고
      </div> */}

      <div className="NavBar--buttons-container">
        <div
          className={`Navbar--buttons-box ${activeButton === '/' ? 'active' : ''}`}
          onClick={onClickHome}
        >
          <span className={isMobile ? "b4-14-sb" : "pc-button fs-16"}>Home</span>
        </div>
        <div
          className={`Navbar--buttons-box ${activeButton === '/archive' ? 'active' : ''}`}
          onClick={onClickArchive}
        >
          <span className={isMobile ? "b4-14-sb" : "pc-button fs-16"}>Archive</span>
        </div>
        <div
          className={`Navbar--buttons-box ${activeButton === '/signin' ? 'active' : ''}`}
          onClick={onClickLogin}
        >
          <span className={isMobile ? "b4-14-sb" : "pc-button fs-16"}>My</span>
        </div>
      </div>
    </nav>
    
  );
}

export default NavBar;