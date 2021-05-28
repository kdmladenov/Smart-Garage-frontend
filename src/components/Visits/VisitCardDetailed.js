import React from 'react';
import PropTypes from 'prop-types';
const VisitCardDetailed = ({ visit }) => {
  return (
    <div>
      To be changed
      <div>{visit.notes}</div>
      <div>{visit.status}</div>
      <div>{visit.visitStart}</div>
      <div>{visit.visitEnd}</div>
    </div>
  );
};

VisitCardDetailed.defaultProps = {
  streetAddress: '',
  firstName: '',
  lastName: '',
  companyName: '',
  visitEnd: ''
};

VisitCardDetailed.propTypes = {
  visit: PropTypes.shape({
    addressId: PropTypes.number.isRequired,
    visitId: PropTypes.number.isRequired,
    carSegment: PropTypes.number.isRequired,
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
    manufacturerName: PropTypes.string.isRequired,
    modelId: PropTypes.number.isRequired,
    modelName: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    streetAddress: PropTypes.string,
    transmission: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    vehicleId: PropTypes.number.isRequired,
    vin: PropTypes.string.isRequired,
    visitEnd: PropTypes.string,
    visitStart: PropTypes.string.isRequired
  }).isRequired
};

export default VisitCardDetailed;
