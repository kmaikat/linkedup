import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import "../../stylesheets/Signup.css"
import logo from "../../assets/linkedup.svg"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [signupStage, setSignupStage] = useState(1)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const regex = RegExp(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
  );

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const phase1Check = async (e) => {
    const errors = {};
    e.preventDefault();

    if (email.length > 0 === false) errors.email = "Please enter your email"
    else if (!email.trim().match(regex)) {
      errors.email = "Please provide a valid email"
    }

    if (password.length >= 6 === false) errors.password = "Password must be 6 or more characters long"
    if (repeatPassword.length > 0 === false) errors.repeatPassword = "Please retype your password"
    else if (repeatPassword !== password) errors.repeatPassword = "Password does not match"

    if (Object.keys(errors).length > 0) {
      setErrors(errors)
      return;
    }

    setSignupStage(2)
  }

  const phase2Check = async (e) => {
    const errors = {};
    e.preventDefault()

    if (firstName.length > 0 === false) errors.firstName = "Please enter your first name";
    if (lastName.length > 0 === false) errors.lastName = "Please enter your last name";

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setSignupStage(3)
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };
  const updateCity = (e) => {
    setCity(e.target.value);
  };
  const updateState = (e) => {
    setState(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div id='signup-outer-container'>
      <div id='signup-inner-container'>
        <div id='heading-container'>
          <div id='heading-logo-container'>
            <img src={logo} alt='logo' />
          </div>
          <div id='heading-subtitle-content'>
            Make the most of your professional life
          </div>
        </div>
        <div id='signup-bottom-container'>
          {signupStage === 1 &&
            <form id='signup-form' onSubmit={phase1Check}>
              <div>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <div>
                <label>User Name</label>
                <input
                  className='input'
                  type='text'
                  name='username'
                  onChange={updateUsername}
                  value={username}
                ></input>
              </div>
              <div>
                <label>Email</label>
                <input
                  className='input'
                  type='text'
                  name='email'
                  onChange={updateEmail}
                  value={email}
                ></input>
              </div>
              <div>
                <label>Password</label>
                <input
                  className='input'
                  type='password'
                  name='password'
                  onChange={updatePassword}
                  value={password}
                ></input>
              </div>
              <div>
                <label>Repeat Password</label>
                <input
                  className='input'
                  type='password'
                  name='repeat_password'
                  onChange={updateRepeatPassword}
                  value={repeatPassword}
                // required={true}
                ></input>
              </div>
              {/* <div>
                <label>City</label>
                <input
                  type='text'
                  name='city'
                  onChange={updateCity}
                  value={city}
                  required={true}
                ></input>
              </div>
              <div>
                <label>State</label>
                <input
                  type='text'
                  name='state'
                  onChange={updateState}
                  value={state}
                  required={true}
                ></input>
              </div> */}
            </form>}
          {signupStage === 2 &&
            <form id='signup-form' onSubmit={phase2Check}>
              <div>
                <label>First Name</label>
                <input
                  type='text'
                  name='first_name'
                  onChange={updateFirstName}
                  value={firstName}
                  required={true}
                ></input>
              </div>
              <div>
                <label>Last Name</label>
                <input
                  type='text'
                  name='last_name'
                  onChange={updateLastName}
                  value={lastName}
                  required={true}
                ></input>
              </div>
            </form>
          }
          <div id='signup-button-container'>
            <div id='signup-button'>
              {signupStage === 1 && <button form='signup-form' type='submit'>Next</button>}
              {signupStage === 2 && <button form='signup-form' type='submit'>Next</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
