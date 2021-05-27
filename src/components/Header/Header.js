import { BrowserRouter as Router, NavLink, useHistory } from 'react-router-dom';
import { MDBNavbar, MDBNavbarNav, MDBNavItem, MDBIcon } from 'mdbreact';
import { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import AuthContext, { getToken, getUsername } from '../../providers/AuthContext';
import './Header.css';
import { BASE_URL } from '../../common/constants';

const Header = ({ windowWidth, breakWidth }) => {
  const [content, setContent] = useState('customers');
  const [sideNavVisible, toggleSideNavVisible] = useState(true);
  const { setAuthValue } = useContext(AuthContext);
  const history = useHistory();

  const handleHamburgerClick = () => {
    toggleSideNavVisible(!sideNavVisible);
  };

  useEffect(() => {
    toggleSideNavVisible(windowWidth > breakWidth);
  }, [windowWidth]);

  const navStyle = {
    paddingLeft:
      windowWidth > breakWidth ? '15rem' : '16px'
  };

  const specialCaseNavbarStyles = {
    WebkitBoxOrient: 'horizontal',
    flexDirection: 'row'
  };

  const sideNavStyle = {
    margin: '0',
    paddingTop: '0',
    paddingLeft: '0',
    backgroundColor: '#034b4e',
    width: '15rem',
    height: '100vh',
    position: 'fixed',
    zIndex: '1040'
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
        history.push('/logout');
        localStorage.removeItem('token');
      });
  };

  return (
    <Router>
      <div className="fixed-sn light-blue-skin">
        {windowWidth < breakWidth && <div
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
        </div>}
        <div style={{
          position: 'absolute',
          zIndex: '1045',
          width: '15rem',
          textAlign: 'center',
          lineHeight: '64px',
          verticalAlign: 'middle',
          color: sideNavVisible ? '#ffffff' : '#004c4f'
        }}>
          {getUsername().toUpperCase()}
        </div>
        {sideNavVisible && <div className="side-nav" style={sideNavStyle}>
          {content === 'customers' && <div>Customers sidebar</div>}
          {content === 'vehicles' && <div>Vehicles sidebar</div>}
          {content === 'services' && <div>Services sidebar</div>}
          {content === 'parts' && <div>Parts sidebar</div>}
          {content === 'invoices' && <div>Invoices sidebar</div>}
        </div>}
        <MDBNavbar style={navStyle} double expand="md" fixed="top" scrolling>
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
              <NavLink to="/logout" className="nav-link" role="button" onClick={logout} style={{ borderLeft: '1px solid #000' }}>
                <MDBIcon icon="sign-out-alt" className="d-inline-inline" />
                <div className="d-none d-md-inline">Logout</div>
              </NavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBNavbar>

      </div>
    </Router>
  );
};

export default Header;

Header.propTypes = {
  windowWidth: PropTypes.number.isRequired,
  breakWidth: PropTypes.number.isRequired
};
