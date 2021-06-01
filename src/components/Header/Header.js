import { NavLink } from 'react-router-dom';
import { MDBNavbar, MDBNavbarNav, MDBNavItem, MDBIcon, MDBBtn } from 'mdbreact';
import { useState } from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import { getUser } from '../../providers/AuthContext';

const Header = ({ toggleModal, num, setCreatePartMode, createPartMode, setCreateServiceMode, createServiceMode }) => {
  // const [content, setContent] = useState('customers');
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
        <div
          className={sideNavVisible ? 'open' : ''}
          id="hamburgerBtn"
          onClick={handleHamburgerClick}
        >
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`username ${sideNavVisible ? 'open' : ''}`}>{username.toUpperCase()}</div>
        <div className={`side-nav ${sideNavVisible ? 'open' : ''}`} style={sideNavStyle}>
          {content === 'customers' && <div>Customers sidebar</div>}
          {content === 'vehicles' && <div>Vehicles sidebar</div>}
          {content === 'services' && (
            <div>
              <MDBBtn type="button" onClick={() => setCreateServiceMode(!createServiceMode)}>
                {!createServiceMode ? 'Create New Service' : 'Close Create Form'}
              </MDBBtn>
            </div>
          )}
          {content === 'parts' && (
            <div>
              <MDBBtn type="button" onClick={() => setCreatePartMode(!createPartMode)}>
                {!createPartMode ? 'Create New Part' : 'Close Create Form'}
              </MDBBtn>
            </div>
          )}
          {content === 'invoices' && <div>Invoices sidebar</div>}
        </div>
        <MDBNavbar double expand="md" fixed="top" scrolling>
            {/* <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div className={`username ${sideNavVisible ? 'open' : ''}`}>
          {username.toUpperCase()}
        </div>
        {content !== 'account' &&
          <div className={`side-nav ${sideNavVisible ? 'open' : ''}`} style={sideNavStyle}>
            {content === 'customers' && <div>Customers sidebar</div>}
            {content === 'vehicles' && <div>Vehicles sidebar</div>}
            {content === 'services' && <div>Services sidebar</div>}
            {content === 'parts' && <div>Parts sidebar</div>}
            {content === 'invoices' && <div>Invoices sidebar</div>}
          </div>
        }
        <MDBNavbar double expand="md" fixed="top" scrolling style={{ backgroundColor: `${content === 'account' ? '#42414094' : 'transparent'}` }}> */}
          <MDBNavbarNav right style={specialCaseNavbarStyles}>
            {getUser().role === 'employee' &&
            <>
              <MDBNavItem active>
                <NavLink to="/customer-profile" className="nav-link" role="button" onClick={() => setContent('account')}>
                  <MDBIcon icon="user" className="d-inline-inline" style={navColor} />
                  <div className="d-none d-md-inline" style={navColor}>Account</div>
                </NavLink>
              </MDBNavItem>
              <MDBNavItem active>
                <NavLink to="/customers" className="nav-link" role="button" onClick={() => setContent('customers')}>
                  <MDBIcon icon="user-friends" className="d-inline-inline" style={navColor} />
                  <div className="d-none d-md-inline" style={navColor}>Customers</div>
                </NavLink>
              </MDBNavItem>
              <MDBNavItem>
                <NavLink to="/vehicles" className="nav-link" role="button" onClick={() => setContent('vehicles')}>
                  <MDBIcon icon="car-alt" className="d-inline-inline" style={navColor} />
                  <div className="d-none d-md-inline" style={navColor}>Vehicles</div>
                </NavLink>
              </MDBNavItem>
              <MDBNavItem>
                <NavLink to="/services" className="nav-link" role="button" onClick={() => setContent('services')}>
                  <MDBIcon icon="wrench" className="d-inline-inline" style={navColor} />
                  <div className="d-none d-md-inline" style={navColor}>Services</div>
                </NavLink>
              </MDBNavItem>
              <MDBNavItem>
                <NavLink to="/parts" className="nav-link" role="button" onClick={() => setContent('parts')}>
                  <MDBIcon icon="cogs" className="d-inline-inline" style={navColor} />
                  <div className="d-none d-md-inline" style={navColor}>Parts</div>
                </NavLink>
              </MDBNavItem>
              <MDBNavItem>
                <NavLink to="/invoices" className="nav-link" role="button" onClick={() => setContent('invoices')}>
                  <MDBIcon icon="file-invoice-dollar" className="d-inline-inline" style={navColor} />
                  <div className="d-none d-md-inline" style={navColor}>Invoices</div>
                </NavLink>
              </MDBNavItem>
            </>}
            <MDBNavItem>
              <button
                className="nav-link"
                role="button"
                onClick={() => toggleModal(num)}
                style={{ borderLeft: '1px solid #000' }}
              >
                <MDBIcon icon="sign-out-alt" className="d-inline-inline" />
                <div className="d-none d-md-inline">Logout</div>
              {/* <button className="nav-link" role="button" onClick={() => toggleModal(num)} style={{ borderLeft: '1px solid #000' }}>
                <MDBIcon icon="sign-out-alt" className="d-inline-inline" style={navColor} />
                <div className="d-none d-md-inline" style={navColor}>Logout</div> */}
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
  createServiceMode: false
};

Header.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  num: PropTypes.number.isRequired,
  setCreatePartMode: PropTypes.func.isRequired,
  createPartMode: PropTypes.bool.isRequired,
  setCreateServiceMode: PropTypes.func.isRequired,
  createServiceMode: PropTypes.bool.isRequired
};
