import { createContext } from 'react';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  setAuthValue: () => {}
});

export const getToken = () => {
  return localStorage.getItem('token') || '';
};

export const getUser = () => {
  try {
    return jwtDecode(getToken());
  } catch (error) {
    return null;
  }
};

export default AuthContext;
