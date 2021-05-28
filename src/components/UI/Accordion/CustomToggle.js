import React from 'react';
import PropTypes from 'prop-types';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import { Button } from 'react-bootstrap';

const CustomToggle = ({ children, eventKey, variant, customFunc }) => {
  const handleClick = useAccordionToggle(
    eventKey,
    () => {
      customFunc && customFunc(false);
      console.log(customFunc);
    }
  );

  return (
    <Button type="button" variant={variant} onClick={handleClick}>
      {children}
    </Button>
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
