import React from 'react';
import PropTypes from 'prop-types';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
// import { Button } from 'react-bootstrap';
import './CustomToggle.css';
import { MDBBtn } from 'mdbreact';

const CustomToggle = ({ children, eventKey, variant, customFunc }) => {
  const handleClick = useAccordionToggle(
    eventKey,
    () => {
      customFunc && customFunc(false);
    }
  );

  return (
    <MDBBtn type="button" variant={variant} onClick={handleClick}>
      {children}
    </MDBBtn>
  );
};

CustomToggle.defaultProp = {
  func: () => {}
};

CustomToggle.propTypes = {
  children: PropTypes.string.isRequired,
  eventKey: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  customFunc: PropTypes.func
};

export default CustomToggle;
