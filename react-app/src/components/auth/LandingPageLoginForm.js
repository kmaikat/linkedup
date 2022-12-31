import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import "../../stylesheets/LandingPageLoginForm.css"

const LandingPageLoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailFieldContainer = useRef();
  const passwordFieldContainer = useRef();
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
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
    return <Redirect to='/' />;
  }

  return (
    <form onSubmit={onLogin}>
      <div>
        {errors.map((error, ind) => (
          <div key={ind}>{error}</div>
        ))}
      </div>
      <div className='landing-page-login-input'
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
      <div className='landing-page-login-input' ref={passwordFieldContainer}
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
      <button id="landing-page-demo-user" onClick={demoLogin}> Sign in as Demo User</button>
      <button type='submit' id="landing-page-login-sign-in">Sign in</button>
    </form>
  );
};

export default LandingPageLoginForm;
