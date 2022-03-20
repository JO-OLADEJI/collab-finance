import React, { useCallback, useEffect, useState } from 'react';
import '../styles/SignUp.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';
import illustration from '../assets/signup-graphic.png';


const SignUP = (props) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [validationError, setValidationError] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [usernameWarning, setUsernameWarning] = useState('');

  useEffect(() => {
    document.title = 'Sign up | Collab Finance';
  }, []);

  const usernameValidityCheck = async (value) => {
    console.log('checking username . . .');

    if (value.length === 0) {
      setUsernameWarning(() => '');
    }
    else if (value.length < 4) {
      setUsernameWarning(() => 'username should be at least 4 characters !');
    }
    else {
      setUsernameWarning(() => 'checking . . .');
      // hit the endpoint here
    }
  };
  // usernameValidityCheck(username);

  const debouncedFeedback = useCallback(
    debounce(async (nextValue) => usernameValidityCheck(nextValue.trim()), 0.8 * 1000),
    []
  );

  const handleUsernameChange = async (e) => {
    const { value: nextValue } = e.target;
    setUsername(nextValue.trim());
    debouncedFeedback(nextValue);
  }

  const renderUsernameFeedback = () => {
    if (username.length === 0 && !isUsernameValid) {
      return (<i 
        className="fa-solid fa-check"
        style={{ color: '#999999' }}
      />);
    }
    else if (!isUsernameValid) { // check if it's communicating to the API
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
    <motion.section 
      className="signup"
      initial={{ x: '-50vw' }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <div className="signup-illustration">
        <Link to="/" className="signup-logo">
          <motion.h3 
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            collab finance
          </motion.h3>
        </Link>
        <p className="signup-statement">
          Begin your journey to raise capital for your business goals.
        </p>
        <motion.img
          src={illustration}
          alt="depiction of graph and checkmark"
          className="signup-graphic"
          initial={{ y: '-100vh', scale: 1.5 }}
          animate={{ y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 150, delay: 0.7, duration: 0.5 }}
        />
      </div>

      <form className="signup-form" autoComplete="off">
        <h3>Create your account.</h3>
        <div className="signup-names-space">
          <div className="signup-input-wrapper">
            <label className="signup-input-label">
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
            <label className="signup-input-label">
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
          <label className="signup-input-label">
            username
            <br />
            <input 
              type="text"
              value={username}
              onChange={async (e) => handleUsernameChange(e)}
              placeholder="@johnsmith - min. of 4 letters"
            />
          </label>
          {renderUsernameFeedback()}
          {usernameWarning.length > 0 ? <p>{usernameWarning}</p> : null}
        </div>
        <div className="signup-input-wrapper">
          <label className="signup-input-label">
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
          <label className="signup-input-label">
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
        <motion.button 
          onClick={(e) => {
            e.preventDefault();
            console.log('call the API here');
          }}
          type="submit"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          Create Account
        </motion.button>

        <p>
          Already have an account? 
          <Link to="/signin">
            sign in <i className="fa-solid fa-user" />
          </Link>
        </p>
        <motion.div 
          className="back-link"
          initial={{ x: '50vw' }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 130, delay: 1 }}
        >
          <Link to="/">
            <i id="left-arrow" className="fa-solid fa-chevron-left" /> back
          </Link>
        </motion.div>

        <p id="sign-up-validation-error">{validationError}</p>
      </form>
    </motion.section>
  );
}
 
export default SignUP;