import { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { BASE_URL, modals } from './common/constants';
import Customers from './containers/Users/Customers';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Modal from './components/Modal/Modal';
import ResetPassword from './components/ResetPassword/ResetPassword';
import AuthContext, { getToken, getUser } from './providers/AuthContext';
import GuardedRoute from './providers/GuardedRoute';

const App = () => {
  // const [customerQuery, setCustomerQuery] = useState();
  const [authValue, setAuthValue] = useState({
    isLoggedIn: !!getUser(),
    user: getUser()
  });

  const modalNumber = 'Modal14';
  const [modalIsOpen, toggleModalIsOpen] = useState({ [modalNumber]: false });
  const toggleModal = () => {
    toggleModalIsOpen({ [modalNumber]: !modalIsOpen[modalNumber] });
  };

  const logout = () => {
    fetch(`${BASE_URL}/auth/logout`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
      .then(res => res.json())
      .then(() => {
        setAuthValue({
          user: null,
          isLoggedIn: false
        });
        toggleModal(modals.VERTICALLY_CENTERED);
        localStorage.removeItem('token');
      });
  };

  // console.log(authValue);
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ ...authValue, setAuthValue }}>
        <Route path="/reset-password/:userId/:token" exact component={ResetPassword} />
        <Route path="/login" exact component={Login} />
        {authValue.isLoggedIn && (
          <Header
            toggleModal={toggleModal}
            num={modals.VERTICALLY_CENTERED}
          />
        )}
        <Switch>
          <Redirect path="/" exact to="/customers" />
          <GuardedRoute
            path="/customers"
            exact
            component={Customers}
            isLoggedIn={
              authValue.isLoggedIn && authValue.user.role === 'employee'
            }
          />
        </Switch>
        <Modal
          modalHeader="Are you leaving?"
          modalMessage="Are you sure want to logout?"
          buttonText="logout"
          buttonOnClick={logout}
          num={modals.VERTICALLY_CENTERED}
          toggle={toggleModal}
          isOpen={modalIsOpen}
        />
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
