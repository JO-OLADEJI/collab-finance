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

  useEffect(() => {
    document.title = 'Sign up | Collab Finance';
  }, []);

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
        <div className="signup-input-wrapper">
          <label>
            username
            <br />
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="@johnsmith"
            />
          </label>
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
        <div className="signup-input-wrapper">
          <label>
            password
            <br />
            <input 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="******"
            />
          </label>
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
            sign in
          </Link>
        </p>
      </form>
    </section>
  );
}
 
export default SignUP;