import { NavLink } from 'react-router-dom';
import { MDBNavbar, MDBNavbarNav, MDBNavItem, MDBIcon } from 'mdbreact';
import { useState } from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import { getUser } from '../../providers/AuthContext';
import PartsSideNav from './PartsSideNav';
import ServicesSideNav from './ServicesSideNav';
import CustomersSideNav from './CustomersSideNav';
import VehiclesSideNav from './VehiclesSideNav';

const Header = ({
  toggleModal,
  num,
  createServiceMode,
  setCreateServiceMode,
  createPartMode,
  setCreatePartMode,
  registerCustomerMode,
  setRegisterCustomerMode,
  setCustomersQuery,
  setVehiclesQuery,
  setServicesQuery,
  setPartsQuery
}) => {
  const initialContent = getUser().role === 'employee' ? 'customers' : 'account';
  const [content, setContent] = useState(initialContent);
  const [sideNavVisible, toggleSideNavVisible] = useState(false);

  const handleHamburgerClick = () => {
    toggleSideNavVisible(!sideNavVisible);
  };

  const specialCaseNavbarStyles = {
    WebkitBoxOrient: 'horizontal',
    flexDirection: 'row'
  };

  const sideNavStyle = {
    margin: '0',
    paddingTop: '0',
    paddingLeft: '0',
    backgroundColor: '#00695a',
    width: '15rem',
    height: '100vh',
    position: 'fixed',
    zIndex: '1040'
  };
  const username = getUser().email.substr(0, getUser().email.indexOf('@'));

  const navColor = { color: `${content === 'account' ? '#ffffff' : '#004c4f'}` };

  return (
    <>
      <div className="fixed-sn light-blue-skin">
        <div className={sideNavVisible ? 'open' : ''} id="hamburgerBtn" onClick={handleHamburgerClick}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`username ${sideNavVisible ? 'open' : ''}`}>{username.toUpperCase()}</div>
        {content !== 'account' &&
        <div className={`side-nav ${sideNavVisible ? 'open' : ''}`} style={sideNavStyle}>
          {content === 'customers' &&
            <CustomersSideNav
              setRegisterCustomerMode={setRegisterCustomerMode}
              registerCustomerMode={registerCustomerMode}
              setCustomersQuery={setCustomersQuery}
            />}
          {content === 'vehicles' &&
            <VehiclesSideNav
              setVehiclesQuery={setVehiclesQuery}
            />}
          {content === 'services' &&
            <ServicesSideNav
              setCreateServiceMode={setCreateServiceMode}
              createServiceMode={createServiceMode}
              setServicesQuery={setServicesQuery}
            />}
          {content === 'parts' &&
            <PartsSideNav
              setCreatePartMode={setCreatePartMode}
              createPartMode={createPartMode}
              setPartsQuery={createPartMode}
            />}
          {content === 'invoices' && <div>Invoices sidebar</div>}
        </div>}
        <MDBNavbar
          double
          expand="md"
          fixed="top"
          scrolling
          style={{ backgroundColor: `${content === 'account' ? '#42414094' : 'transparent'}` }}
        >
          <MDBNavbarNav right style={specialCaseNavbarStyles}>
            {getUser().role === 'employee' && (
              <>
                <MDBNavItem active>
                  <NavLink
                    to="/customer-profile"
                    className="nav-link"
                    role="button"
                    onClick={() => setContent('account')}
                  >
                    <MDBIcon icon="user" className="d-inline-inline" style={navColor} />
                    <div className="d-none d-md-inline" style={navColor}>
                      Account
                    </div>
                  </NavLink>
                </MDBNavItem>
                <MDBNavItem active>
                  <NavLink to="/customers" className="nav-link" role="button" onClick={() => setContent('customers')}>
                    <MDBIcon icon="user-friends" className="d-inline-inline" style={navColor} />
                    <div className="d-none d-md-inline" style={navColor}>
                      Customers
                    </div>
                  </NavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <NavLink to="/vehicles" className="nav-link" role="button" onClick={() => setContent('vehicles')}>
                    <MDBIcon icon="car-alt" className="d-inline-inline" style={navColor} />
                    <div className="d-none d-md-inline" style={navColor}>
                      Vehicles
                    </div>
                  </NavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <NavLink to="/services" className="nav-link" role="button" onClick={() => setContent('services')}>
                    <MDBIcon icon="wrench" className="d-inline-inline" style={navColor} />
                    <div className="d-none d-md-inline" style={navColor}>
                      Services
                    </div>
                  </NavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <NavLink to="/parts" className="nav-link" role="button" onClick={() => setContent('parts')}>
                    <MDBIcon icon="cogs" className="d-inline-inline" style={navColor} />
                    <div className="d-none d-md-inline" style={navColor}>
                      Parts
                    </div>
                  </NavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <NavLink to="/invoices" className="nav-link" role="button" onClick={() => setContent('invoices')}>
                    <MDBIcon icon="file-invoice-dollar" className="d-inline-inline" style={navColor} />
                    <div className="d-none d-md-inline" style={navColor}>
                      Invoices
                    </div>
                  </NavLink>
                </MDBNavItem>
              </>
            )}
            <MDBNavItem>
                <button className="nav-link" role="button" onClick={() => toggleModal(num)} style={{ borderLeft: '1px solid #000' }}>
                <MDBIcon icon="sign-out-alt" className="d-inline-inline" style={navColor} />
                <div className="d-none d-md-inline" style={navColor}>Logout</div>
              </button>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBNavbar>
      </div>
    </>
  );
};

export default Header;

Header.defaultProps = {
  createPartMode: false,
  createServiceMode: false,
  registerCustomerMode: false
};

Header.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  num: PropTypes.number.isRequired,
  setCreatePartMode: PropTypes.func.isRequired,
  createPartMode: PropTypes.bool.isRequired,
  setCreateServiceMode: PropTypes.func.isRequired,
  createServiceMode: PropTypes.bool.isRequired,
  setRegisterCustomerMode: PropTypes.func.isRequired,
  registerCustomerMode: PropTypes.bool.isRequired,
  setCustomersQuery: PropTypes.func.isRequired,
  setVehiclesQuery: PropTypes.func.isRequired,
  setServicesQuery: PropTypes.func.isRequired,
  setPartsQuery: PropTypes.func.isRequired
};
