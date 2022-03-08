import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Landing = (props) => {
  useEffect(() => {
    document.title = 'Collab Finance | raise capital with collaborators and teams.';
  }, []);

  return (
    <section>
      <h1>Welcome to Collab Finance 💰</h1>
      <Link to="/signup">signup</Link>
    </section>
  );
}
 
export default Landing;