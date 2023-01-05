import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import "../../stylesheets/AppNavBar.css"



const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e)
    await dispatch(logout());
  };

  return <p style={{ cursor: "pointer" }} id='sign-out-button' onClick={onLogout}>Sign Out</p>;
};

export default LogoutButton;
