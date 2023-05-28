import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import app_config from '../../config';
import { useBrandContext } from '../../context/BrandProvider';

const Navbar = () => {
  const url = app_config.apiUrl;

  const { loggedIn, setLoggedIn, logout } = useBrandContext();
  const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')));

  const showAvatar = () => {
    if (loggedIn)
      return (
        <div className="dropdown">
          <a
            className="dropdown-toggle d-flex align-items-center hidden-arrow"
            href="#"
            id="navbarDropdownMenuAvatar"
            role="button"
            data-mdb-toggle="dropdown"
            aria-expanded="false"
          >
            {currentUser !== null && (
              <img
                src={
                  currentUser.avatar
                    ? `${url}/${currentUser.avatar}`
                    : 'https://png.pngtree.com/png-clipart/20210915/ourlarge/pngtree-avatar-placeholder-abstract-white-blue-green-png-image_3918476.jpg'
                }
                className="rounded-circle"
                height={30}
              />
            )}
          </a>
          <ul className="dropdown-menu">
            <li>
              <NavLink className="dropdown-item" to="/brand/profile">
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink className="dropdown-item" to="/brand/managejobs">
                My Campaigns
              </NavLink>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" onClick={logout} type="button">
                Logout
              </a>
            </li>
          </ul>
        </div>
      );
  };

  return (
    <>
      {/* Navbar */}
      <>
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          {/* Container wrapper */}
          <div className="container">
            {/* Toggle button */}
            <button
              className="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars" />
            </button>
            {/* Collapsible wrapper */}
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              {/* Navbar brand */}
              <a className="navbar-brand mt-2 mt-lg-0" href="#">
                <img src="/Images/social-media.png" height={30} width={30} alt="Logo" loading="lazy" />
              </a>
              {/* Left links */}
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item my-auto">
                  <h3 className="m-0">BRAND DASHBORD</h3>
                </li>
              </ul>
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/home">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/main/signup">
                    Signup
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/main/login">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/main/brandsignup">
                    Brand Signup
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/main/brandlogin">
                    Brand Login
                  </NavLink>
                </li>
              </ul>
              {/* Left links */}
            </div>
            {showAvatar()}
          </div>
          {/* Container wrapper */}
        </nav>
        {/* Navbar */}
      </>

      {/* Navbar */}
    </>
  );
};

export default Navbar;
