import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import "../../stylesheets/LandingPageLoginForm.css"

const LandingPageLoginForm = () => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailFieldContainer = useRef();
  const passwordFieldContainer = useRef();
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const regex = RegExp(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
  );

  const onLogin = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const data = await dispatch(login(email, password));


    const errorObj = {};
    if (!email) errorObj.email = "Please enter your email adress."
    if (!email.trim().match(regex)) errorObj.email = "Please enter a valid email address"
    // if (data.email) errorObj.email = "Couldn’t find a LinkedUp account associated with this email. Please try again."
    if (!password) errorObj.password = "Please enter your password."
    if (password.length < 8) errorObj.password = "Password must be 8 characters or more."
    // if (data.password) errorObj.password = "That's not the right password. Please try again."
    if (!email && !password) errorObj.both = "Please fill out both fields."

    if (Object.keys(errorObj).length !== 0) {
      setErrors(errorObj)
      return;
    }

    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    const data = await dispatch(login("demo@aa.io", "password"));
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/feed' />;
  }

  return (
    <>
      <h2 className="input-error-test-landing-page-error-title">{errors.both ? errors.both : errors.email || errors.password}</h2>
      <form onSubmit={onLogin} onKeyDown={e => e.key === "Enter" ? onLogin(e) : undefined}>
        <div className={`landing-page-login-input ${errors.email ? "input-error" : ""}`}
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
        <div className={`landing-page-login-input ${errors.password ? "input-error" : ""}`}
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
      </form>
      <button id="landing-page-demo-user" onClick={demoLogin}> Sign in as Demo User</button>
      <button onClick={onLogin} id="landing-page-login-sign-in">Sign in</button>
    </>
  );
};

export default LandingPageLoginForm;
