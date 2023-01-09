import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import logo from "../../assets/linkedup.svg"
import "../../stylesheets/LoginPage.css"

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const regex = RegExp(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
  );

  const emailFieldContainer = useRef();
  const passwordFieldContainer = useRef();

  const demoLogin = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
  }

  const onLogin = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const data = await dispatch(login(email, password));

    const errorObj = {};
    if (!email) errorObj.email = "Please enter your email adress."
    else if (!email.trim().match(regex)) {
      errorObj.email = "Please enter a valid email address"
    } else if (email) {
      const response = await fetch(`/api/users/email-check/${email}`)
      if (response.ok) errorObj.email = "Couldn’t find a LinkedUp account associated with this email. Please try again."
    }

    if (!password) errorObj.password = "Please enter your password."
    else if (email.length > 0 && password.length < 6) {
      errorObj.password = "Password must be 6 characters or more."
    } else if (password && !email) {
      errorObj.email = "Please enter your email address"
    } else if (password) {
      errorObj.password = "That's not the right password. Please try again."
    }

    if (Object.keys(errorObj).length !== 0) {
      setErrors(errorObj)
      return;
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (

    <div id='login-form-page-outer-container'>
      <div id='login-form-page-inner-container'>
        <nav id="login-page-navbar">
          <a href='/'>
            <img id='login-page-logo-icon' src={logo} alt="linkedup-logo" />
          </a>
        </nav>
        <div id='body'>
          <div id="login-page-body-container">

            <div id='form-body-header'>
              <div>Sign in</div>
              <div>Stay updated on your professional world</div>
            </div>
            <form class="login-page-form" onSubmit={onLogin} onKeyDown={e => e.key === "Enter" ? onLogin(e) : undefined}>

              <div className='login-page-input-container'>
                <div id="login-page-input" className={`landing-page-login-input ${errors.email ? "input-error" : ""}`}
                  ref={emailFieldContainer}
                  onClick={() => {
                    emailFieldContainer.current.children.email.focus()
                  }}
                >
                  <label htmlFor='email' className={email.length > 0 ? "landing-page-login-label-filled" : ""}>Email</label>
                  <input
                    name='email'
                    type='text'
                    value={email}
                    onChange={updateEmail}
                  />
                </div>
                <p className="input-error-text">{errors.email}</p>
              </div>

              <div className='login-page-input-container'>
                <div id="login-page-input" className={`landing-page-login-input ${errors.password ? "input-error" : ""}`}
                  ref={passwordFieldContainer}
                  onClick={() => {
                    passwordFieldContainer.current.children.password.focus()
                  }}
                >
                  <label htmlFor='password' className={password.length > 0 ? "landing-page-login-label-filled" : ""}>Password</label>
                  <input
                    name='password'
                    type='password'
                    value={password}
                    onChange={updatePassword}
                  />
                </div>
                <p className="input-error-text">{errors.password}</p>
              </div>
            </form>
            <button type='submit' id="landing-page-login-sign-in" onClick={onLogin}>Sign In</button>
            <div id='login-form-button-sparator'>
              <hr className='login-line'></hr>
              <p id='or-separator'>or</p>
              <hr className='login-line'></hr>
            </div>
            <button type='submit' id="login-page-login-sign-in" className='demo-sign-in' onClick={demoLogin}><i className="fa-solid fa-user"></i>Sign in as Demo User</button>
          </div>
          <div id='direct-to-sign-up-container'>
            <p>New to LinkedUp?</p>
            <a href='/sign-up'>Join now</a>
          </div>
        </div>
      </div>
    </div>

  );
};

export default LoginForm;
