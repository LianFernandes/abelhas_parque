import axios from 'axios';
import { LoginPayload } from '../contexts/AuthContext';
import { useAuth } from '../contexts/AuthContext';

interface IRequest {
  isLogged: boolean;
  credentials?: LoginPayload;
}

const instance = axios.create({
  baseURL: 'http://localhost:3333'
});

export function handleHeader({ isLogged, credentials }: IRequest) {
  if (!isLogged) {
    delete instance.defaults.headers.idtoken;
    delete instance.defaults.headers.Authorization;
  }
  
  if (isLogged && credentials?.type === 'google') {
    instance.defaults.headers.idtoken = credentials.token;
  }

  if (isLogged && credentials?.type === 'local'){
    instance.defaults.headers.Authorization = `Bearer ${credentials.token}`;
  }
}

export default instance;