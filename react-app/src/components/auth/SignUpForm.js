import React, { useEffect, useState } from 'react';
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
  const [profilePicture, setProfilePicture] = useState('')
  const [title, setTitle] = useState('')
  const [bio, setBio] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [signupStage, setSignupStage] = useState(1)

  const [hasSubmitted, setHasSubmited] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const regex = RegExp(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
  );

  useEffect(() => {
    const errors = {}
    if (title.length < 1 || title.length > 100) errors.title = true;
    if (bio.length < 1 || bio.length > 300) errors.bio = true;

    setErrors(errors)
}, [title, bio])

  const phase1Check = async (e) => {
    const errors = {};
    e.preventDefault();

    if (!username) errors.username = "Please enter a username"
    if (username.length > 29) errors.username = "Username must be less than 29 characters long"

    if (email.length > 0 === false) errors.email = "Please enter your email"
    if (email.length < 4 || email.length > 128) errors.email = "Email must be between 3 to 128 characters"
    else if (!email.trim().match(regex)) {
      errors.email = "Please provide a valid email"
    } else if (email) {
      const response = await fetch(`/api/users/email-check/${email}`)
      if (!response.ok) errors.email = "An account with this email already exists"
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
    if (firstName.length > 50) errors.firstName = "First name can not exceed 50 characters.";
    if (lastName.length > 0 === false) errors.lastName = "Please enter your last name";
    if (lastName.length > 50) errors.lastName = "Last name can not exceed 50 characters.";

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setSignupStage(3)
  }

  const phase3Check = async (e) => {
    const errors = {};
    e.preventDefault()

    if (city.length > 0 === false) errors.city = "Please enter a city";
    if (city.length > 60) errors.city = "City can not exceed 60 characters.";

    if (state.length > 0 === false) errors.state = "Please enter a state";
    if (state.length > 60) errors.state = "State can not exceed 60 characters.";

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setSignupStage(4)
  }

  const phase4Check = async (e) => {
    const errors = {}
    e.preventDefault()

    if (title.length > 0 === false) errors.title = "Please enter a title."
    if (title.length > 100) errors.title = "Exceeded maximum character length of 100"
    if (bio.length > 0 === false) errors.bio = "Please enter a bio."
    if (bio.length > 300) errors.bio = "Exceeded maximum character length of 300"

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }



    const submission = {
      "username": username,
      "email": email,
      "password": password,
      "first_name": firstName,
      "last_name": lastName,
      "profile_picture": profilePicture,
      "title": title,
      "bio": bio,
      "city": city,
      "state": state
    }

    await dispatch(signUp(submission));
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
  const updateTitle = (e) => {
    setTitle(e.target.value);
  };
  const updateBio = (e) => {
    setBio(e.target.value);
  };
  const updateProfilePicture = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    const res = await fetch("/api/images/", {
      method: "POST",
      body: formData
    })

    if (res.ok) {
      const data = await res.json();
      setProfilePicture(data.url);
    } else {
      const errors = await res.json();
      console.log(errors)
      errors.image = "Image failed to upload;"
    }
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
        <div id="signup-form-outer-container">

          <div id='signup-bottom-container'>
            {signupStage === 1 &&
              <form className='signup-form' id="signup-phase-1" onSubmit={phase1Check}>
                <div>
                  <label>User Name</label>
                  <input
                    className={errors.username ? "input input-error" : "input"}
                    type='text'
                    name='username'
                    onChange={updateUsername}
                    value={username}
                  ></input>
                  <p className="input-error-text">{errors.username}</p>
                </div>
                <div>
                  <label>Email</label>
                  <input
                    className={errors.email ? "input input-error" : "input"}
                    type='text'
                    name='email'
                    onChange={updateEmail}
                    value={email}
                  ></input>
                  <p className="input-error-text">{errors.email}</p>
                </div>
                <div>
                  <label>Password (6 or more characters)</label>
                  <input
                    className={errors.password ? "input input-error" : "input"}
                    type='password'
                    name='password'
                    onChange={updatePassword}
                    value={password}
                  ></input>
                  <p className="input-error-text">{errors.password}</p>
                </div>
                <div>
                  <label>Repeat Password</label>
                  <input
                    className={errors.repeatPassword ? "input input-error" : "input"}
                    type='password'
                    name='repeat_password'
                    onChange={updateRepeatPassword}
                    value={repeatPassword}
                  // required={true}
                  ></input>
                  <p className="input-error-text">{errors.repeatPassword}</p>
                </div>
              </form>}
            {signupStage === 2 &&
              <form className='signup-form' id="signup-phase-2" onSubmit={phase2Check}>
                <div>
                  <label>First Name</label>
                  <input
                    type='text'
                    name='first_name'
                    onChange={updateFirstName}
                    value={firstName}
                    className={errors.firstName ? "input input-error" : "input"}
                  ></input>
                  <p className="input-error-text">{errors.firstName}</p>
                </div>
                <div>
                  <label>Last Name</label>
                  <input
                    type='text'
                    name='last_name'
                    onChange={updateLastName}
                    value={lastName}
                    className={errors.lastName ? "input input-error" : "input"}
                  ></input>
                  <p className="input-error-text">{errors.lastName}</p>
                </div>
              </form>
            }
            {signupStage == 3 &&
              <form className='signup-form' id="signup-phase-3" onSubmit={phase3Check}>
                <div>
                  <label>City</label>
                  <input
                    type='text'
                    name='city'
                    onChange={updateCity}
                    value={city}
                    className={errors.city ? "input input-error" : "input"}
                  ></input>
                  <p className='input-error-text'>{errors.city}</p>
                </div>
                <div>
                  <label>State</label>
                  <input
                    type='text'
                    name='state'
                    onChange={updateState}
                    value={state}
                    className={errors.state ? "input input-error" : "input"}
                  ></input>
                  <p className='input-error-text'>{errors.state}</p>
                </div>
              </form>
            }
            {signupStage == 4 &&
              <form className='signup-form' id="signup-phase-4" onSubmit={phase4Check}>
                <div>
                  <label>Title</label>
                  <input
                    type='text'
                    name='title'
                    onChange={updateTitle}
                    value={title}
                    className={errors.title ? "input input-error" : "input"}
                  ></input>
                  <p className='input-error-text'>{errors.title}</p>
                </div>
                <div>
                  <label>Bio</label>
                  <input
                    type='text'
                    name='bio'
                    onChange={updateBio}
                    value={bio}
                    className={errors.bio ? "input input-error" : "input"}
                  ></input>
                  <p className='input-error-text'>{errors.bio}</p>
                </div>
                <div>
                  <label>Profile Picture</label>
                  <input
                    type='file'
                    accept='image/png, image/jpg, image/jpeg, image/gif'
                    name='profile_picture'
                    onChange={updateProfilePicture}
                    className={errors.state ? "input input-error" : "input"}
                  ></input>
                  {/* <p className='input-error-text'>{errors.profilePicture}</p> */}
                </div>
              </form>

            }

            <div className='signup-button-container'>
              {signupStage === 1 && <button form='signup-phase-1' type='submit' className='signup-submit-button'>Next</button>}
              {signupStage === 2 && <button form='signup-phase-2' type='submit' className='signup-submit-button'>Next</button>}
              {signupStage === 3 && <button form='signup-phase-3' type='submit' className='signup-submit-button'>Next</button>}
              {signupStage === 4 && <button form='signup-phase-4' type='submit' className='signup-submit-button' id='signup-can-submit' disabled={errors.bio || errors.title}>Finish</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
