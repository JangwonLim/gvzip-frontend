import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import './NavBar.css';
import { useMediaQuery } from 'react-responsive';
import { useAuth } from "../../utils/AuthContext";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated } = useAuth();

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const onClickHome = () => {
    navigate('/');
  };

  const onClickArchive = () => {
    navigate('/archive');
  };

  const onClickLogin = () => {
    if (isAuthenticated) {
      navigate('/profile')
    } else {
      navigate('/signin');
    }
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
          className={`Navbar--buttons-box ${location.pathname === '/' ? 'active' : ''}`}
          onClick={onClickHome}
        >
          <span className={isMobile ? "b4-14-sb" : "pc-button fs-16"}>Home</span>
        </div>
        <div
          className={`Navbar--buttons-box ${location.pathname === '/archive' ? 'active' : ''}`}
          onClick={onClickArchive}
        >
          <span className={isMobile ? "b4-14-sb" : "pc-button fs-16"}>Archive</span>
        </div>
        <div
          className={`Navbar--buttons-box ${location.pathname === '/profile' ? 'active' : ''}`}
          onClick={onClickLogin}
        >
          <span className={isMobile ? "b4-14-sb" : "pc-button fs-16"}>
            {isAuthenticated ? "My" : "Login"}
          </span>
        </div>
      </div>
    </nav>
    
  );
}

export default NavBar;