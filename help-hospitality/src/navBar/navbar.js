import React from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import './navbar.css';
import {
    Link
  } from "react-router-dom";

const Navbar = () => {
  return (
    <div id="header">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <div className="navBar" id="myHeader">
        <div className="topNav">
          <Link
            id="link"
            offset={-70}
            duration={500}
            spy={true}
            to="/"
          >
            Home
          </Link>{' '}
          <Link
            id="link"
            to="/restaurants"
            activeClassName="max-screen"
          >
           Restaurants
          </Link>
          <NavLink
            id="link"
            to="/resources"
            activeClassName="max-screen"
          >
            Resources
          </NavLink>{''}
          <NavLink
            id="link"
            to="/signup"
            activeClassName="max-screen"
          >
            Sign Up
          </NavLink>
          <NavLink
            id="link"
            to="/login"
            activeClassName="max-screen"
          >
            Log in
          </NavLink>
        
        </div>

        <div className="dropNav">
          <i className="fa fa-align-justify" id="dropbtn"></i>
          <div className="dropdown-content">
            <NavLink
              smooth
              to="/restaurants"
              activeClassName="min-screen"
              className="min-screen"
            >
              Restaurants
            </NavLink>
            <NavLink
              smooth
              to="/resources"
              activeClassName="min-screen"
              className="min-screen"
            >
              Resources
            </NavLink>
            <NavLink
              smooth
              to="/signup"
              activeClassName="min-screen"
              className="min-screen"
            >
              Signup
            </NavLink>
            <NavLink
              smooth
              to="/login"
              activeClassName="min-screen"
              className="min-screen"
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Navbar;
