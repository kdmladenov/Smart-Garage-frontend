import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import CustomToggle from '../UI/Accordion/CustomToggle';
import VisitCardDetailed from './VisitCardDetailed';

const VisitCard = ({ visit, allCurrencies }) => {
  const [editMode, setEditMode] = useState(false);
  const [visitCardHeader, setVisitCardHeader] = useState({
    notes: visit.notes,
    visitStatus: visit.visitStatus,
    visitStart: visit.visitStart,
    visitEnd: visit.visitEnd
  });

  return (
    <>
      <Accordion>
        <Card key={visit.visitId}>
          <Card.Header className="card-header">
            <div className="card-header-text">
              <div>{visitCardHeader.notes}</div>
              <div style={{ padding: '0 10px' }}>|</div>
              <div>{visitCardHeader.visitStatus}</div>
              <div style={{ padding: '0 10px' }}>|</div>
              <div>{new Date(visitCardHeader.visitStart).toISOString().slice(0, 10)}</div>
              {visit.visitEnd && <div style={{ padding: '0 10px' }}>/</div>}
              <div>{visitCardHeader.visitEnd ? new Date(visitCardHeader.visitEnd).toISOString().slice(0, 10) : ''}</div>
            </div>
            <div className="card-header-buttons">
              <CustomToggle variant="primary" eventKey="1">
                Details
              </CustomToggle>
            </div>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <VisitCardDetailed
                key={visit.visitId}
                visitId={visit.visitId}
                carSegment={visit.carSegment}
                editMode={editMode}
                setEditMode={setEditMode}
                allCurrencies={allCurrencies}
                setVisitCardHeader={setVisitCardHeader}
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
};

VisitCard.defaultProps = {
  streetAddress: '',
  firstName: '',
  lastName: '',
  companyName: '',
  visitEnd: '',
  visitStatus: ''
};

VisitCard.propTypes = {
  visit: PropTypes.shape({
    addressId: PropTypes.number.isRequired,
    visitId: PropTypes.number.isRequired,
    carSegmentId: PropTypes.number.isRequired,
    carSegment: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    companyName: PropTypes.string,
    country: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    engineType: PropTypes.string.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    licensePlate: PropTypes.string.isRequired,
    manufacturedYear: PropTypes.number.isRequired,
    manufacturerId: PropTypes.number.isRequired,
    manufacturer: PropTypes.string.isRequired,
    modelId: PropTypes.number.isRequired,
    modelName: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    visitStatus: PropTypes.string,
    streetAddress: PropTypes.string,
    transmission: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    vehicleId: PropTypes.number.isRequired,
    vin: PropTypes.string.isRequired,
    visitEnd: PropTypes.string,
    visitStart: PropTypes.string
  }).isRequired,
  allCurrencies: PropTypes.array.isRequired
};

export default VisitCard;
