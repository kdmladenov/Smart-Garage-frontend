import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import { BASE_URL, CURRENCY_API_KEY, CURRENCY_URL, modals } from './common/constants';
import Customers from './containers/Customers/Customers';
import Vehicles from './containers/Vehicles/Vehicles';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Modal from './components/Modal/Modal';
import ResetPassword from './components/ResetPassword/ResetPassword';
import AuthContext, { getToken, getUser } from './providers/AuthContext';
import GuardedRoute from './providers/GuardedRoute';
import Services from './containers/Services/Services';
import Parts from './containers/Parts/Parts';
import CustomerProfile from './containers/CustomerProfile/CustomerProfile';

const App = () => {
  const [customersQuery, setCustomersQuery] = useState('');
  const [vehiclesQuery, setVehiclesQuery] = useState('');
  const [servicesQuery, setServicesQuery] = useState('');
  const [partsQuery, setPartsQuery] = useState('');
  const [createPartMode, setCreatePartMode] = useState(false);
  const [createServiceMode, setCreateServiceMode] = useState(false);
  const [registerCustomerMode, setRegisterCustomerMode] = useState(false);
  const [authValue, setAuthValue] = useState({
    isLoggedIn: !!getUser(),
    user: getUser()
  });
  // const modalNumber = 'Modal14';
  const [detailedVisitReport, setDetailedVisitReport] = useState('');
  const [modalIsOpen, toggleModalIsOpen] = useState({ modal14: false });
  const toggleModal = (modalNumber) => {
    toggleModalIsOpen({ [modalNumber]: !modalIsOpen[modalNumber] });
  };

  const [allCurrencies, setAllCurrencies] = useState([]);

  useEffect(() => {
    fetch(`${CURRENCY_URL}/api/v7/currencies?apiKey=${CURRENCY_API_KEY}`)
      .then(res => res.json())
      .then(res => setAllCurrencies([...Object.keys(res.results)]))
      .catch(e => setAllCurrencies(['BGN']));
  }, []);

  const logout = () => {
    fetch(`${BASE_URL}/auth/logout`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
      .then((res) => res.json())
      .then(() => {
        setAuthValue({
          user: null,
          isLoggedIn: false
        });
        toggleModal(modals.VERTICALLY_CENTERED.name);
        localStorage.removeItem('token');
      });
  };

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ ...authValue, setAuthValue }}>
        <Route path="/reset-password/:userId/:token" exact component={ResetPassword} />
        <Route path="/login" exact component={Login} />
        {authValue.isLoggedIn && (
          <Header
            toggleModal={toggleModal}
            num={modals.VERTICALLY_CENTERED.num}
            setCreateServiceMode={setCreateServiceMode}
            createServiceMode={createServiceMode}
            setCreatePartMode={setCreatePartMode}
            createPartMode={createPartMode}
            registerCustomerMode={registerCustomerMode}
            setRegisterCustomerMode={setRegisterCustomerMode}
            setCustomersQuery = {setCustomersQuery}
            setVehiclesQuery = {setVehiclesQuery}
            setServicesQuery = {setServicesQuery}
            setPartsQuery = {setPartsQuery}
          />
        )}
        <Switch>
          <Redirect path="/" exact to="/customers" />
          <GuardedRoute
            path="/customers"
            exact
            component={() => (
              <Customers
                registerCustomerMode={registerCustomerMode}
                setRegisterCustomerMode={setRegisterCustomerMode}
                allCurrencies={allCurrencies}
                customersQuery={customersQuery}
              />
            )}
            isLoggedIn={authValue.isLoggedIn && authValue.user.role === 'employee'}
          />
          <GuardedRoute
            path="/vehicles"
            exact
            component={(props) => <Vehicles { ...props } allCurrencies={allCurrencies} vehiclesQuery={vehiclesQuery} />}
            isLoggedIn={authValue.isLoggedIn && authValue.user.role === 'employee'}
          />
          <GuardedRoute
            path="/services"
            exact
            component={() => (
              <Services createServiceMode={createServiceMode} setCreateServiceMode={setCreateServiceMode} servicesQuery={servicesQuery} />
            )}
            isLoggedIn={authValue.isLoggedIn && authValue.user.role === 'employee'}
          />
          <GuardedRoute
            path="/parts"
            exact
            component={() => <Parts createPartMode={createPartMode} setCreatePartMode={setCreatePartMode} partsQuery={partsQuery} />}
            isLoggedIn={authValue.isLoggedIn && authValue.user.role === 'employee'}
          />
          <GuardedRoute
            path="/customer-profile"
            exact
            component={() => (
              <CustomerProfile
                toggleModal={toggleModal}
                num={modals.SCROLLING_LONG_CONTENT.num}
                setDetailedVisitReport={setDetailedVisitReport}
                allCurrencies={allCurrencies}
                detailedVisitReport={detailedVisitReport}
                modalIsOpen={modalIsOpen}
              />
            )}
            isLoggedIn={authValue.isLoggedIn}
          />
        </Switch>
        <Modal
          modalHeader="Are you leaving?"
          modalBody="Are you sure want to logout?"
          buttonText="logout"
          buttonOnClick={logout}
          num={modals.VERTICALLY_CENTERED.num}
          toggle={toggleModal}
          isOpen={modalIsOpen}
        />
        <Modal
          modalHeader="Detailed Visit Report"
          modalBody={detailedVisitReport}
          buttonText="PDF"
          // buttonOnClick={}
          num={modals.SCROLLING_LONG_CONTENT.num}
          toggle={toggleModal}
          isOpen={modalIsOpen}
        />
      </AuthContext.Provider>
    </BrowserRouter>
  );
};

export default App;
