import React, { useState, useCallback } from 'react';
import '../styles/pages/register.css';

import { useAuth } from '../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';

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
    });

  }, [Register, confirmPassword, email, history, name, password]);

    return (
      <>
        <div id="page-login">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nome: </label>
            <input
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password: </label>
            <input 
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="confirmPassword">Confirmação da senha:</label>
            <input 
              type="password"
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
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

export default Register;