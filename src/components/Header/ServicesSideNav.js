import { MDBBtn } from 'mdbreact';
import PropTypes from 'prop-types';

const ServicesSideNav = ({ setCreateServiceMode, createServiceMode, setServicesQuery }) => {
  return (
    <div className="side-nav-content">
      <MDBBtn type="button" onClick={() => setCreateServiceMode(!createServiceMode)}>
        {!createServiceMode ? 'Create New Service' : 'Close Create Form'}
      </MDBBtn>
    </div>
  );
};

ServicesSideNav.propTypes = {
  setCreateServiceMode: PropTypes.func.isRequired,
  createServiceMode: PropTypes.bool.isRequired,
  setServicesQuery: PropTypes.func.isRequired
};

export default ServicesSideNav;
