import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import CustomToggle from '../UI/Accordion/CustomToggle';
import './Services.css';

const ServiceCard = ({ service }) => {
  return (
    <>
      <Card key={service.serviceId}>
        <Card.Header className="card-header">
          <div className="card-header-text">
            <div className="card-header-text-item">{service.name}</div>
            <div className="card-header-text-item">{service.price}</div>
            <div className="card-header-text-item">{service.carSegment}</div>
          </div>
          <div className="card-header-buttons">
            <CustomToggle variant="primary" eventKey="1">
              Button
            </CustomToggle>
          </div>
        </Card.Header>
      </Card>
    </>
  );
};

ServiceCard.propTypes = {
  service: PropTypes.shape({
    serviceId: PropTypes.number.isRequired,
    carSegmentId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    carSegment: PropTypes.string.isRequired
  }).isRequired

};

export default ServiceCard;
