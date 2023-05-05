import React from 'react';
import PropTypes from 'prop-types';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
// import { Button } from 'react-bootstrap';
import './CustomToggle.css';
import { Button } from 'react-bootstrap';

const CustomToggle = ({ children, eventKey, variant, customFunc, createMode, setCreateMode, disabled }) => {
  const handleClick = useAccordionToggle(eventKey, () => {
    customFunc && customFunc(false);
    setCreateMode && setCreateMode(!createMode);
  });

  return (
    <Button type="button" variant={variant} onClick={handleClick} disabled={disabled}>
      {children}
    </Button>
  );
};

CustomToggle.defaultProp = {
  func: () => {},
  disabled: false
};

CustomToggle.propTypes = {
  children: PropTypes.string.isRequired,
  eventKey: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired,
  customFunc: PropTypes.func,
  createMode: PropTypes.bool,
  setCreateMode: PropTypes.func,
  disabled: PropTypes.bool
};

export default CustomToggle;
