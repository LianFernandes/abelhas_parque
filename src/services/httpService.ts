import axios from 'axios';
<<<<<<< HEAD
import { LoginPayload } from '../contexts/AuthContext';
import { useAuth } from '../contexts/AuthContext';

interface IRequest {
  isLogged: boolean;
  credentials?: LoginPayload;
}
=======
>>>>>>> c3acc1350dfcfcc2168e6cfe6d088851a117e517

const instance = axios.create({
  baseURL: 'http://localhost:3333'
});

<<<<<<< HEAD
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

=======
>>>>>>> c3acc1350dfcfcc2168e6cfe6d088851a117e517
export default instance;