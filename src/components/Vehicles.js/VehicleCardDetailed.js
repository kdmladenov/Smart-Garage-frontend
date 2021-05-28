import React from 'react';
import PropTypes from 'prop-types';
const VehicleCardDetailed = ({ vehicle }) => {
  return (
    <div>
      <div>{vehicle.make}</div>
      <div>{vehicle.model}</div>
      <div>{vehicle.manufacturedYear}</div>
      <div>{vehicle.licensePlate}</div>
      <div>{vehicle.vin}</div>
      <div>{vehicle.engineType}</div>
      <div>{vehicle.transmission}</div>
      <div>{vehicle.carSegment}</div>
    </div>
  );
};

VehicleCardDetailed.defaultProps = {
  carSegment: '',
  carSegmentId: '',
  fullName: null,
  companyName: ''
};

VehicleCardDetailed.propTypes = {
  vehicle: PropTypes.shape({
    carSegment: PropTypes.string,
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
    vehicleId: PropTypes.number.isRequired,
    vin: PropTypes.string.isRequired
  }).isRequired
};

export default VehicleCardDetailed;
