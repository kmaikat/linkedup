
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { getPostsThunk } from '../store/posts';
import LogoutButton from './auth/LogoutButton';
import caratDown from '../assets/caret-down.svg'
import noPP from "../assets/no-pp.png";
import up from "../assets/up.svg"
import "../stylesheets/AppNavBar.css"

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getPostsThunk())
  }, [history.location.pathname])

  return (
    <nav id='app-feed-nav-bar'>
      <div id='app-feed-nav-bar-inner-container'>
        <div id="landing-page-nav-bar-main-left">
          <img id="app-nav-bar-logo" src={up}></img>
        </div>
        <ul id='app-feed-nav-bar-actions'>
          <li className='app-feed-nav-bar-icon'>
            <NavLink to='/' exact={true} activeClassName='active'>
              <i className="fa-solid fa-house-chimney"></i>
              <div className='navbar-action-labels'>
                  Home
              </div>
            </NavLink>
          </li>
          <li className='app-feed-nav-bar-icon'>
            <div id="navbar-user-icon">
              <img id='no-pp' src={noPP} />
            </div>
            <div className='navbar-action-labels'>
              Me <img id="caret-down" src={caratDown} />
            </div>
            {/* <LogoutButton /> */}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
