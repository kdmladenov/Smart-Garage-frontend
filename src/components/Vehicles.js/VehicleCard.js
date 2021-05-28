import React from 'react';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import CustomToggle from '../UI/Accordion/CustomToggle';
import Loading from '../UI/Loading';
import { BASE_URL } from '../../common/constants';
import useHttp from '../../hooks/useHttp';
import VehicleCardDetailed from './VehicleCardDetailed';
import VisitCard from '../Visits/VisitCard';
import './Vehicles.css';

const VehicleCard = ({ vehicle }) => {
  console.log('vehiclekk', vehicle);
  const {
    data,
    // setLocalData,
    loading
    // error
  } = useHttp(`${BASE_URL}/visits?vehicleId=${vehicle.vehicleId}`, 'GET', []);

  if (loading) {
    return <Loading />;
  }

  // // if (error === '404') {
  // //   history.push('*');
  // // } else if (error) {
  // //   history.push('/serviceUnavailable');
  // // }
  console.log('visits', data);
  const visitListToShow = (
      <div className="visit-list">
        {data.map((visit) => {
          return (
            <VisitCard
              className="visit-card"
              key={visit.visitId}
              visit={visit}
            />
          );
        })}
      </div>
  );
  // console.log('visitListToShow', visitListToShow);
  return (
    <>
      <Accordion>
        <Card key={vehicle.vehicleId}>
          <Card.Header className="card-header">
            <div className="card-header-text">
              <div className="card-header-text-item">{vehicle.make}</div>
              <div className="card-header-text-item">{vehicle.model}</div>
              <div className="card-header-text-item">
                {vehicle.licensePlate}
              </div>
            </div>
            <div className="card-header-buttons">
              <CustomToggle variant="primary" eventKey="1">
                Details
              </CustomToggle>
              <CustomToggle variant="primary" eventKey="2">
                History
              </CustomToggle>
            </div>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <VehicleCardDetailed key={vehicle.vehicleId} vehicle={vehicle} />
            </Card.Body>
          </Accordion.Collapse>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              {data.length
                ? (
                <ul>{visitListToShow}</ul>
                  )
                : (
                <h2> No visits found for this vehicle </h2>
                  )}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
};

VehicleCard.defaultProps = {
  carSegment: '',
  carSegmentId: '',
  fullName: null,
  companyName: ''
};

VehicleCard.propTypes = {
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

export default VehicleCard;
