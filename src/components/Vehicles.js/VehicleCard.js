import React, { useState } from 'react';
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

const VehicleCard = ({
  vehicle,
  registerVehicleMode,
  setRegisterVehicleMode,
  registerCustomerMode,
  setRegisterCustomerMode,
  newCustomerId,
  allCurrencies,
  setVehicleList,
  vehicleList
}) => {
  const [editMode, setEditMode] = useState(false);
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
  const visitListToShow = (
    <div className="visit-list">
      {data.map((visit) => {
        return <VisitCard className="visit-card" key={visit.visitId} visit={visit} allCurrencies={allCurrencies} />;
      })}
    </div>
  );

  if (registerVehicleMode || registerCustomerMode) {
    return (
      <VehicleCardDetailed
        vehicle={vehicle}
        editMode={editMode}
        setEditMode={setEditMode}
        registerVehicleMode={registerVehicleMode}
        setRegisterVehicleMode={setRegisterVehicleMode}
        registerCustomerMode={registerCustomerMode}
        setRegisterCustomerMode={setRegisterCustomerMode}
        newCustomerId={newCustomerId}
        setVehicleList={setVehicleList}
        vehicleList={vehicleList}
      />
    );
  }

  return (
    !registerVehicleMode && (
      <>
        <Accordion>
          <Card key={vehicle.vehicleId}>
            <Card.Header className="card-header">
              <div className="card-header-text">
                <div className="card-header-text-item">{vehicle.manufacturer}</div>
                <div className="card-header-text-item">{vehicle.modelName}</div>
                <div className="card-header-text-item">{vehicle.licensePlate}</div>
              </div>
              <div className="card-header-buttons">
                <CustomToggle variant="primary" eventKey="1" setEditMode={setEditMode}>
                  Details
                </CustomToggle>
                <CustomToggle variant="primary" eventKey="2" setEditMode={setEditMode}>
                  History
                </CustomToggle>
              </div>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <VehicleCardDetailed
                  key={vehicle.vehicleId}
                  vehicle={vehicle}
                  editMode={editMode}
                  setEditMode={setEditMode}
                  registerVehicleMode={registerVehicleMode}
                  setRegisterVehicleMode={setRegisterVehicleMode}
                />
              </Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                {data.length ? <ul>{visitListToShow}</ul> : <h2> No visits found for this vehicle </h2>}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </>
    )
  );
};

VehicleCard.defaultProps = {
  carSegment: '',
  carSegmentId: '',
  fullName: null,
  companyName: '',
  email: '',
  engineType: '',
  licensePlate: '',
  manufacturer: '',
  manufacturedYear: null,
  manufacturerId: null,
  modelName: '',
  modelId: null,
  transmission: '',
  userId: null,
  vehicleId: null,
  vin: '',
  registerVehicleMode: false,
  registerCustomerMode: false,
  setRegisterVehicleMode: () => {},
  newCustomerId: null,
  setRegisterCustomerMode: () => {},
  setVehicleList: () => {},
  vehicleList: []
};

VehicleCard.propTypes = {
  vehicle: PropTypes.shape({
    carSegment: PropTypes.string,
    carSegmentId: PropTypes.number,
    email: PropTypes.string,
    engineType: PropTypes.string,
    fullName: PropTypes.string,
    licensePlate: PropTypes.string,
    manufacturer: PropTypes.string,
    manufacturedYear: PropTypes.number,
    manufacturerId: PropTypes.number,
    modelName: PropTypes.string,
    modelId: PropTypes.number,
    transmission: PropTypes.string,
    userId: PropTypes.number,
    vehicleId: PropTypes.number,
    vin: PropTypes.string
  }).isRequired,
  registerVehicleMode: PropTypes.bool,
  registerCustomerMode: PropTypes.bool,
  setRegisterVehicleMode: PropTypes.func,
  newCustomerId: PropTypes.number,
  setRegisterCustomerMode: PropTypes.func,
  allCurrencies: PropTypes.array.isRequired,
  setVehicleList: PropTypes.func,
  vehicleList: PropTypes.array
};

export default VehicleCard;
