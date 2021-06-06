import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import CustomToggle from '../UI/Accordion/CustomToggle';
import VisitCardDetailed from './VisitCardDetailed';

const VisitCard = ({ visit, allCurrencies }) => {
  // console.log('visits1', visit);
  const [editMode, setEditMode] = useState(false);

  // console.log(visitList && [...visitList, visit], 'visitList vcd');

  return (
    <>
      <Accordion>
        <Card key={visit.visitId}>
          <Card.Header className="card-header">
            <div className="card-header-text">
              <div className="card-header-text-item">{visit.notes}</div>
              <div className="card-header-text-item">{visit.visitStatus}</div>
              <div className="card-header-text-item">{new Date(visit.visitStart).toISOString().slice(0, 10)}</div>
              <div className="card-header-text-item">{new Date(visit.visitEnd).toISOString().slice(0, 10)}</div>
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
                // setVisitList={setVisitList}
                // visitList={visitList}
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
  visitEnd: ''
  // setVisitList: () => {},
  // visitList: []
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
    visitStatus: PropTypes.string.isRequired,
    streetAddress: PropTypes.string,
    transmission: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    vehicleId: PropTypes.number.isRequired,
    vin: PropTypes.string.isRequired,
    visitEnd: PropTypes.string,
    visitStart: PropTypes.string.isRequired
  }).isRequired,
  allCurrencies: PropTypes.array.isRequired
  // setVisitList: PropTypes.func,
  // visitList: PropTypes.array
};

export default VisitCard;
