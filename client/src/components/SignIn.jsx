import { React, useState, useEffect } from 'react';
import '../styles/SignIn.css';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import illustration from '../assets/signin-graphic.png';


const SignIn = (props) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState('password');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    document.title = 'Sign in | Collab Finance';
  }, []);

  const login = async (identity, password) => {
    // check if identity or password is not empty
    // parse the identity for @ - to check if email or username was passed
    // set the appropriate request attribute based on the above
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
          Resume your journey to raise capital for your business goals.
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
        <h3>Welcome Back.</h3>
        <div className="signup-input-wrapper">
          <label className="signup-input-label">
            username <span>/</span> email
            <br />
            <input 
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier((e.target.value).trim())}
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
          Sign In
        </motion.button>

        <p>
          Don't have an account? 
          <Link to="/signup">
            sign up <i className="fa-solid fa-user-plus" />
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
 
export default SignIn;