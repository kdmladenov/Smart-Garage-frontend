import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import { MDBNavbar, MDBNavbarNav, MDBNavItem, MDBIcon } from 'mdbreact';
import { useState } from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import { getUser } from '../../providers/AuthContext';

const Header = ({
  toggleModal, num
}) => {
  const [content, setContent] = useState('customers');
  const [sideNavVisible, toggleSideNavVisible] = useState(true);

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

  return (
    <Router>
      <div className="fixed-sn light-blue-skin">
        <div
          className={sideNavVisible ? 'open' : ''}
          id="hamburgerBtn"
          onClick={handleHamburgerClick}
          style={{
            lineHeight: '32px',
            marginRight: '1em',
            verticalAlign: 'middle',
            zIndex: '1050'
          }}
        >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div style={{
          position: 'absolute',
          zIndex: '1045',
          width: '15rem',
          textAlign: 'center',
          lineHeight: '64px',
          verticalAlign: 'middle',
          color: sideNavVisible ? '#ffffff' : '#004c4f'
        }}>
          {username.length > 8 ? `${username.substr(0, 7).toUpperCase()}...` : username.toUpperCase()}
        </div>
        <div className={`side-nav ${sideNavVisible ? 'open' : ''}`} style={sideNavStyle}>
          {content === 'customers' && <div>Customers sidebar</div>}
          {content === 'vehicles' && <div>Vehicles sidebar</div>}
          {content === 'services' && <div>Services sidebar</div>}
          {content === 'parts' && <div>Parts sidebar</div>}
          {content === 'invoices' && <div>Invoices sidebar</div>}
        </div>
        <MDBNavbar double expand="md" fixed="top" scrolling>
          <MDBNavbarNav right style={specialCaseNavbarStyles}>
            <MDBNavItem active>
              <NavLink to="/customers" className="nav-link" role="button" onClick={() => setContent('customers')}>
                <MDBIcon icon="user" className="d-inline-inline" />
                <div className="d-none d-md-inline">Customers</div>
              </NavLink>
            </MDBNavItem>
            <MDBNavItem>
              <NavLink to="/vehicles" className="nav-link" role="button" onClick={() => setContent('vehicles')}>
                <MDBIcon icon="car-alt" className="d-inline-inline" />
                <div className="d-none d-md-inline">Vehicles</div>
              </NavLink>
            </MDBNavItem>
            <MDBNavItem>
              <NavLink to="/services" className="nav-link" role="button" onClick={() => setContent('services')}>
                <MDBIcon icon="wrench" className="d-inline-inline" />
                <div className="d-none d-md-inline">Services</div>
              </NavLink>
            </MDBNavItem>
            <MDBNavItem>
              <NavLink to="/parts" className="nav-link" role="button" onClick={() => setContent('parts')}>
                <MDBIcon icon="cogs" className="d-inline-inline" />
                <div className="d-none d-md-inline">Parts</div>
              </NavLink>
            </MDBNavItem>
            <MDBNavItem>
              <NavLink to="/invoices" className="nav-link" role="button" onClick={() => setContent('invoices')}>
                <MDBIcon icon="file-invoice-dollar" className="d-inline-inline" />
                <div className="d-none d-md-inline">Invoices</div>
              </NavLink>
            </MDBNavItem>
            <MDBNavItem>
              <button className="nav-link" role="button" onClick={() => toggleModal(num)} style={{ borderLeft: '1px solid #000' }}>
                <MDBIcon icon="sign-out-alt" className="d-inline-inline" />
                <div className="d-none d-md-inline">Logout</div>
              </button>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBNavbar>

      </div>
    </Router>
  );
};

export default Header;

Header.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  num: PropTypes.number.isRequired
};
