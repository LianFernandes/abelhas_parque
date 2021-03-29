import React, { useState, useCallback } from 'react';
import '../styles/pages/register.css';

import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../images/logo3.svg';

const Register: React.FC = () => {
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword] = useState('');

  const { Register } = useAuth();
  const history = useHistory();

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    
    Register(name, email, password, confirmPassword).then(() => {
      history.push("/login");
    }).catch(error => console.log(error));

  }, [Register, confirmPassword, email, history, name, password]);

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
                  <label htmlFor="name">Nome </label>
                  <input
                    type="text"
                    name="name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="input">
                  <label htmlFor="email">Email </label>
                  <input
                    type="text"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="input">
                  <label htmlFor="password">Password </label>
                  <input 
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="input">
                  <label htmlFor="confirmPassword">Confirmação da senha</label>
                  <input 
                    type="password"
                    name="confirmPassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
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

export default Register;