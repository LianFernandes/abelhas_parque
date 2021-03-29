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
    }).catch(error => console.log(error));
   

  }, [Logon, email, history, password]);

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
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                </div>

                <div className="input">
                  <label htmlFor="password">Senha</label>
                  <input 
                    type="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                </div>
                <input className="auth-button" type="submit" value="Enviar" />
              </form>

              <div id="auth-footer">

              <div>
                  <h5>Entrar com o google: </h5>
                  <GoogleLogin
                    clientId="844861144462-k092319m7l1r91djpalqjgi5shsmrgt4.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={onSignIn}
                    onFailure={onError}
                    isSignedIn={true}
                    cookiePolicy={'single_host_origin'}
                  />
                </div>

                <div>
                  <Link to="/register">
                    <span className="auth-link"> Registrar </span>
                  </Link>

                  <Link to="/forgot">
                    <span className="auth-link">Recuperar senha</span>
                  </Link>
                </div>

              </div>

            </div>
          </div>

        </div>
        
      </>
    );
}

export default Login;