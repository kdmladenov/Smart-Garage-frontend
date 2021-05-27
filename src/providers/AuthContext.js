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

export const getUsername = () => {
  const { email } = getUser();
  return email.substring(0, email.indexOf('@'));
};

export default AuthContext;
