import React, { useState, useCallback } from 'react';
import '../styles/pages/register.css';

import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

const Forgot: React.FC = () => {
  const [ email, setEmail ] = useState('');

  const { Forgot } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    
    Forgot(email).then(() => {
      history.push("/login");
    });

  }, [Forgot, email, history]);

    return (
      <>
        <div id="page-login">
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input type="submit" value="Enviar" />
          </form>

        </div>

        <div id="auth-footer">
          <Link to="/login">
            <button type="button">Voltar</button>
          </Link>
        </div>
      </>
    );
}

export default Forgot;