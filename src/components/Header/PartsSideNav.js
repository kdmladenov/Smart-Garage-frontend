import { MDBBtn } from 'mdbreact';
import PropTypes from 'prop-types';
// import { useState } from 'react';
// import { Form } from 'react-bootstrap';

const PartsSideNav = ({ setCreatePartMode, createPartMode, setPartsQuery }) => {
  // const [searchParams, setSearchParams] = useState({});
  return (
    <div>
      <MDBBtn type="button" onClick={() => setCreatePartMode(!createPartMode)}>
        {!createPartMode ? 'Create New Part' : 'Close Create Form'}
      </MDBBtn>

      <input type="range" name="range" step="50000" min="100000" max="1000000" value="" />
      <input type="text" id="rangePrimary" />
    </div>
  );
};

PartsSideNav.propTypes = {
  setCreatePartMode: PropTypes.func.isRequired,
  createPartMode: PropTypes.bool.isRequired,
  setPartsQuery: PropTypes.func.isRequired
};

export default PartsSideNav;
