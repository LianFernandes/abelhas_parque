import React, {
  createContext,
  useState,
  useCallback,
  useContext
} from 'react';
import { GoogleLoginResponse, useGoogleLogout } from 'react-google-login';
import axios from '../services/httpService';
import { GoogleDto } from './GoogleDto';

interface IUseAuth {
  credentials: LoginPayload;
  Logon: (email: string, pass: string) => Promise<void>;
  GoogleLogon: (googleRes: GoogleLoginResponse) => void;
  Register: (name: string, email: string, pass: string, confirmPass: string) => Promise<void>
  Forgot: (email: string) => Promise<void>;
  Logout: () => void;
  isLogged: () => boolean;
};

interface LoginPayload {
  id: string;
  email: string;
  role: string;
  token: string;
};

const AuthContext = createContext({} as IUseAuth);

export const AuthProvider: React.FC = ({ children }) => {
  const [credentials, setCredentials] = useState(() => {
    const credentials = localStorage.getItem('@ian/credentials');
    if (!credentials) {
      return {} as LoginPayload;
    }

    return JSON.parse(credentials) as LoginPayload;
  });

  const Logon = useCallback(async (email: string, password: string) => {
    const response = await axios.post<LoginPayload>('/auth/login', {
      email,
      password
    });

    localStorage.setItem('@ian/credentials', JSON.stringify(response.data))

    setCredentials(response.data);
  }, []);

  const GoogleLogon = useCallback((data: GoogleLoginResponse): void => {
    const googleCredentials = new GoogleDto(data);

    localStorage.setItem('@ian/credentials', JSON.stringify(googleCredentials));

    setCredentials(googleCredentials);
  }, [])

  const Register = useCallback(async (name: string, email: string, password: string, confirmPassword: string) => {
    await axios.post('/auth/register', {
      name,
      email,
      password,
      confirmPassword
    });
  }, []);

  const Forgot = useCallback(async (email: string) => {
    const response = await axios.post('/auth/forgot', { email });
    console.log(response);
  }, []);

  const Logout = useCallback(() => {
    localStorage.removeItem('@ian/credentials');
    googleLogout;
    setCredentials({} as LoginPayload);
  }, [googleLogout]);

  const googleLogout = useGoogleLogout({
    clientId: "844861144462-k092319m7l1r91djpalqjgi5shsmrgt4.apps.googleusercontent.com",
    onLogoutSuccess: () => console.log('Logout sucessfull'),
    onFailure: () => console.log('Logout error')
  })

  const isLogged = useCallback(() => {
    if(credentials.token) {
      return true;
    }

    return false;
  }, [credentials]);

  return (
    <AuthContext.Provider value={{ 
      credentials,
      GoogleLogon,
      Logon,
      Logout,
      Forgot,
      isLogged,
      Register 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
}
