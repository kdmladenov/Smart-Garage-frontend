import { useEffect, useState } from 'react';
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
  const breakWidth = 992;
  const [windowWidth, setWindowWidth] = useState(0);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); };
  }, []);

  const [authValue, setAuthValue] = useState({
    isLoggedIn: !!getUser(),
    user: getUser()
  });

  const mainContainerStyle = {
    backgroundColor: '#ececec',
    minHeight: '100vh',
    paddingTop: '5.5rem',
    paddingRight: '6%',
    paddingLeft:
      windowWidth > breakWidth ? 'calc(6% + 15rem)' : '6%'
  };

  // const { isLoggedIn, user } = authValue

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ ...authValue, setAuthValue }}>
        <Header breakWidth={breakWidth} windowWidth={windowWidth} />
        <main style={mainContainerStyle}>
          <Switch>
            <Redirect path="/" exact to="/home" />
          </Switch>
        </main>
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
