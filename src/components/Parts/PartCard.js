import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import CustomToggle from '../UI/Accordion/CustomToggle';
import './Parts.css';

const PartCard = ({ part }) => {
  return (
    <>
      <Card key={part.partId}>
        <Card.Header className="card-header">
          <div className="card-header-text">
            <div className="card-header-text-item">{part.name}</div>
            <div className="card-header-text-item">{part.carSegment}</div>
            <div className="card-header-text-item">{part.price} BGN</div>
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

PartCard.propTypes = {
  part: PropTypes.shape({
    partId: PropTypes.number.isRequired,
    carSegmentId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    carSegment: PropTypes.string.isRequired
  }).isRequired
};

export default PartCard;
