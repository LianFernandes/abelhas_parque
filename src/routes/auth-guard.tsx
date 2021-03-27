import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface IProps {
  authRoutes?: boolean;
}

const AuthGuard: React.FC<IProps> = ({ children, authRoutes = false }) => {
  const { isLogged } = useAuth(); 
  const location = useLocation();

  const handleLogged = () => {
    if (authRoutes) {
      return <Redirect to="/" />;
    }

    return children;
  }

  const handleUnlogged = () => {
    if (authRoutes) {
      return children;
    }

    return <Redirect to='/login' />
  }

  return (
    <Route
      render={() => 
        isLogged() ? 
        handleLogged() : 
        handleUnlogged()}
    />
  );
}

export default AuthGuard;
