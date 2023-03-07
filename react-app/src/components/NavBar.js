
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  const user = useSelector(state => state.session.user)
  const [showNavbarOptions, setShowNavbarOptions] = useState(false)

  useEffect(() => {
    dispatch(getPostsThunk())
  }, [history.location.pathname])


  return (
    <nav id='app-feed-nav-bar'>
      <div id='app-feed-nav-bar-inner-container'>
        <div className="app-home-navbar-logo" id="landing-page-nav-bar-main-left">
          <img id="app-nav-bar-logo" src={up}></img>
        </div>
        <ul id='app-feed-nav-bar-actions'>
          <li className='app-feed-nav-bar-icon' id='app-navbar-home-container'>
            <NavLink className='app-feed-nav-bar-icon' to='/' exact={true} activeClassName='active'>
              <i className="fa-solid fa-house-chimney"></i>
              <div className='navbar-action-labels'>
                Home
              </div>
            </NavLink>
          </li>
          <li className='app-feed-nav-bar-icon'>
            <NavLink className='app-feed-nav-bar-icon' to='/messaging' exact={true}>
              <i className="fa-solid fa-message"></i>
              <div className='navbar-action-labels'>
                Messages
              </div>
            </NavLink>
          </li>
          <li className='app-feed-nav-bar-icon' onClick={() => setShowNavbarOptions(true)} tabIndex={showNavbarOptions ? 1 : -1} onBlur={() => setShowNavbarOptions(false)}>
            <div id="navbar-user-icon">
              <img id='no-pp' src={user.profile_picture || noPP} />
            </div>
            <div className='navbar-action-labels'>
              Me <img id="caret-down" src={caratDown} />
            </div>
            {showNavbarOptions &&
              <div id='navbar-options-container'>
                <div id='navbar-options-content'>
                  <div id='navbar-user-info-container'>
                    <div id="navbar-user-profile-picture">
                      <img src={user?.profilePicture || noPP} alt="Profile Image" />
                    </div>
                    <div id="navbar-user-profile-information">
                      {user &&
                        <>
                          <p>{user.first_name} {user.last_name}</p>
                          <p>{user.title}</p>
                        </>
                      }
                    </div>
                  </div>
                  <LogoutButton />
                </div>
              </div>
            }
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
