import { useState } from 'react';
import {
  BrowserRouter,
  // Route,
  Switch, Redirect
} from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import AuthContext, { getUser } from './providers/AuthContext';
// import GuardedRoute from "./providers/GuardedRoute";

const App = () => {
  const [authValue, setAuthValue] = useState({
    isLoggedIn: !!getUser(),
    user: getUser()
  });

  // const { isLoggedIn, user } = authValue

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ ...authValue, setAuthValue }}>
        <Header />
        <Switch>
          <Redirect path="/" exact to="/home" />
        </Switch>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;