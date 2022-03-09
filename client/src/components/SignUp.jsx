import React, { useEffect, useState } from 'react';
import '../styles/SignUp.css';
import { Link } from 'react-router-dom';
import graphic from '../assets/signup-graphic.png';

const SignUP = (props) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [validationError, setValidationError] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(false);

  useEffect(() => {
    document.title = 'Sign up | Collab Finance';
  }, []);

  const renderUsernameFeedback = () => {
    if (username.length === 0 && !isUsernameValid) {
      return (<i 
        className="fa-solid fa-check"
        style={{ color: '#5f5f5f' }}
      />);
    }
    else if (!isUsernameValid) { /* check if it's communicating to the API */
      return (<i 
        className="fa-solid fa-spinner"
        style={{ color: '#5f5f5f' }}
      />);
    }
    else if (isUsernameValid) {
      return (<i 
        className="fa-solid fa-check"
        style={{ color: '#009160' }}
      />);
    }
    // check if the API returns the username as invalid
    // return <i className="fa-solid fa-xmark" />
  }

  return (
    <section className="signup">
      <div className="signup-illustration">
        <Link to="/" className="signup-logo">
          <h3>collab finance</h3>
        </Link>
        <p className="signup-statement">
          Begin your journey to raise capital for your businesses & projects.
        </p>
        <img
          src={graphic}
          alt="depiction of graph and checkmark"
          className="signup-graphic"
        />
      </div>

      <form className="signup-form" autoComplete="off">
        <h3>Create your account.</h3>
        <div className="signup-names-space">
          <div className="signup-input-wrapper">
            <label>
              firstname
              <br />
              <input 
                type="text" 
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                placeholder="john"
              />
            </label>
          </div>
          <div className="signup-input-wrapper">
            <label>
              lastname
              <br />
              <input 
                type="text" 
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                placeholder="smith"
              />
            </label>
          </div>
        </div>
        <div className="signup-input-wrapper username-wrapper">
          <label>
            username
            <br />
            <input 
              type="text"
              value={username}
              onChange={(e) => {
                setUsername((e.target.value).trim());
                if (username.length >= 4) {
                  // send validation request to the API
                }
              }}
              placeholder="@johnsmith - min. of 4 letters"
            />
          </label>
          {renderUsernameFeedback()}
        </div>
        <div className="signup-input-wrapper">
          <label>
            email
            <br />
            <input 
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="johnsmith@example.com"
            />
          </label>
        </div>
        <div className="signup-input-wrapper password-wrapper">
          <label>
            password
            <br />
            <input 
              type={passwordType}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
            />
          </label>
          <i 
            className="fa-solid fa-eye-slash"
            onClick={() => setPasswordType(() => passwordType === 'password' ? 'text' : 'password')}
            style={{ color: passwordType === 'password' ? '#5f5f5f' : '#000000' }}
          />
        </div>
        <button 
          onClick={(e) => {
            e.preventDefault();
            console.log('call the API here');
          }}
          type="submit"
        >
          Create Account
        </button>

        <p>
          Already have an accout? 
          <Link to="/signin">
            sign in <i className="fa-solid fa-user" />
          </Link>
        </p>
        <div className="back-link">
          <Link to="/">
            <i id="left-arrow" className="fa-solid fa-chevron-left" /> back
          </Link>
        </div>

        <p id="sign-up-validation-error">{validationError}</p>
      </form>
    </section>
  );
}
 
export default SignUP;