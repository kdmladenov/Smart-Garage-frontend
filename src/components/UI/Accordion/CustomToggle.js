import React from 'react';
import PropTypes from 'prop-types';
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';
import { Button } from 'react-bootstrap';

const CustomToggle = ({ children, eventKey, variant }) => {
  const handleClick = useAccordionToggle(eventKey, () =>
    console.log('toggle clicked')
  );
  return (
    <Button type="button" variant={variant} onClick={handleClick}>
      {children}
    </Button>
  );
};

CustomToggle.propTypes = {
  children: PropTypes.string.isRequired,
  eventKey: PropTypes.string.isRequired,
  variant: PropTypes.string.isRequired
};

export default CustomToggle;
