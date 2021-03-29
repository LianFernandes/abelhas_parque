import React, { useState, useCallback } from 'react';
import '../styles/pages/register.css';

import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../images/logo3.svg';

const Forgot: React.FC = () => {
  const [ email, setEmail ] = useState('');

  const { Forgot } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    
    Forgot(email).then(() => {
      history.push("/login");
    }).catch(error => console.log(error));

  }, [Forgot, email, history]);

    return (
      <>
        <div id="page-login">
          <div className="auth-wrapper">
            <div className="title">
              <img id="logo" src={Logo} alt=""/>
              <h1 >Instituto Abelha Nativa</h1>
            </div>
            <div className="auth-content">
              <form onSubmit={handleSubmit}>
                <div className="input">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <input className="auth-button" type="submit" value="Enviar" />
              </form>
              <div id="auth-footer">
                <Link to="/login">
                  <span className="auth-link">Voltar</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default Forgot;