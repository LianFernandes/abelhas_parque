import React, { useState, useCallback, useEffect } from 'react';
import '../styles/pages/login.css';

import { GoogleLogin, GoogleLoginResponse } from 'react-google-login';
import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../images/logo3.svg';

const Login: React.FC = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const { Logon, GoogleLogon } = useAuth();
  const history = useHistory();

  const onSignIn = useCallback((googleUser) => {
    GoogleLogon(googleUser);
  }, [GoogleLogon]);

  const onError = () => {
    console.log('Google log in error');
  }

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    Logon(email, password).then(() => {
      history.push("/");
    });

  }, [Logon, email, history, password]);

    return (
      <>
        <div id="page-login">
          <div className="auth-wrapper">
            <img src={Logo} alt=""/>
            <div className="auth-content">
              <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
                <input 
                  type="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input type="submit" value="Enviar" />
              </form>



              <div id="auth-footer">
                <Link to="/register">
                  <button type="button">Registrar</button>
                </Link>

                <Link to="/forgot">
                  <button type="button">Esqueci minha senha</button>
                </Link>
                <GoogleLogin
                  clientId="844861144462-k092319m7l1r91djpalqjgi5shsmrgt4.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={onSignIn}
                  onFailure={onError}
                  isSignedIn={true}
                  cookiePolicy={'single_host_origin'}
                />
              </div>

            </div>
          </div>
        </div>
        
      </>
    );
}

export default Login;