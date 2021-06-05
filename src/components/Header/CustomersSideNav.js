import { MDBBtn } from 'mdbreact';
import PropTypes from 'prop-types';

const CustomersSideNav = ({ setRegisterCustomerMode, registerCustomerMode, setCustomersQuery }) => {
  return (
    <div>
              <MDBBtn type="button" onClick={() => setRegisterCustomerMode(!registerCustomerMode)}>
                {!registerCustomerMode ? 'Register New Customer' : 'Close Register Form'}
              </MDBBtn>
            </div>
  );
};

CustomersSideNav.propTypes = {
  setRegisterCustomerMode: PropTypes.func.isRequired,
  registerCustomerMode: PropTypes.bool.isRequired,
  setCustomersQuery: PropTypes.func.isRequired
};

export default CustomersSideNav;
