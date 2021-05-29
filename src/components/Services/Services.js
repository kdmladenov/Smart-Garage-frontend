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
            <div className="card-header-text-item">{service.serviceName}</div>
            <div className="card-header-text-item">{service.servicePrice}</div>
            <div className="card-header-text-item">{service.carSegment}</div>
          </div>
          <div className="card-header-buttons">
            <CustomToggle variant="primary">
              Details
            </CustomToggle>
          </div>
        </Card.Header>
      </Card>
    </>
  );
};

ServiceCard.defaultProps = {
  carSegment: '',
  carSegmentId: '',
  fullName: null,
  companyName: ''
};

ServiceCard.propTypes = {
  service: PropTypes.shape({
    serviceName: PropTypes.string,
    carSegmentId: PropTypes.number,
    email: PropTypes.string.isRequired,
    engineType: PropTypes.string.isRequired,
    fullName: PropTypes.string,
    licensePlate: PropTypes.string.isRequired,
    make: PropTypes.string.isRequired,
    manufacturedYear: PropTypes.number.isRequired,
    manufacturerId: PropTypes.number.isRequired,
    model: PropTypes.string.isRequired,
    modelId: PropTypes.number.isRequired,
    transmission: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    serviceId: PropTypes.number.isRequired,
    vin: PropTypes.string.isRequired
  }).isRequired
};

export default ServiceCard;
