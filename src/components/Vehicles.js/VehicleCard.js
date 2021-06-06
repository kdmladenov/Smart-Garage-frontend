import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import CustomToggle from '../UI/Accordion/CustomToggle';
import { BASE_URL } from '../../common/constants';
import useHttp from '../../hooks/useHttp';
import VehicleCardDetailed from './VehicleCardDetailed';
import VisitCard from '../Visits/VisitCard';
import './Vehicles.css';
import VisitCardDetailed from '../Visits/VisitCardDetailed';

const VehicleCard = ({
  vehicle,
  registerVehicleMode,
  setRegisterVehicleMode,
  registerCustomerMode,
  setRegisterCustomerMode,
  newCustomerId,
  allCurrencies,
  registerVisitMode,
  setRegisterVisitMode,
  newVisit,
  setNewVehicle,
  setCreated
}) => {
  const [editMode, setEditMode] = useState(false);
  const { data } = useHttp(`${BASE_URL}/visits?vehicleId=${vehicle.vehicleId}`, 'GET', []);

  const visitListToShow = (
    <div className="visit-list">
      {data.map((visit) => {
        return <VisitCard className="visit-card" key={visit.visitId} visit={visit} allCurrencies={allCurrencies} />;
      })}
    </div>
  );

  // Case for register customer or register vehicle
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
        setNewVehicle={setNewVehicle}
      />
    );
  }

  // Case for register visit only with existing customer and vehicle
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
                <CustomToggle
                  variant="primary"
                  eventKey="1"
                  setEditMode={setEditMode}
                  createMode={registerVisitMode}
                  setCreateMode={setRegisterVisitMode}
                >
                  Add Visit
                </CustomToggle>
                <CustomToggle variant="primary" eventKey="2" setEditMode={setEditMode}>
                  Details
                </CustomToggle>
                <CustomToggle variant="primary" eventKey="3" setEditMode={setEditMode}>
                  History
                </CustomToggle>
              </div>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
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
            <Accordion.Collapse eventKey="3">
              <Card.Body>
                {data.length ? <ul>{visitListToShow}</ul> : <h2> No visits found for this vehicle </h2>}
              </Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                {registerVisitMode && (
                  <VisitCardDetailed
                    newVisit={{ ...newVisit, ...vehicle }}
                    carSegment={vehicle.carSegment}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    allCurrencies={allCurrencies}
                    registerVisitMode={registerVisitMode}
                    setRegisterVisitMode={setRegisterVisitMode}
                    setRegisterVehicleMode={setRegisterVehicleMode}
                    setCreated={setCreated}
                  />
                )}
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
  city: '',
  country: '',
  firstName: '',
  lastName: '',
  notes: '',
  performedServices: [],
  phone: '',
  visitStatus: '',
  streetAddress: '',
  usedParts: [],
  visitEnd: '',
  visitStart: '',
  addressId: 0,
  registerVehicleMode: false,
  registerCustomerMode: false,
  setRegisterVehicleMode: () => {},
  newCustomerId: null,
  setRegisterCustomerMode: () => {},
  setRegisterVisitMode: () => {},
  registerVisitMode: false,
  setNewVehicle: () => {},
  setCreated: () => {}
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
  setRegisterVisitMode: PropTypes.func,
  registerVisitMode: PropTypes.bool,
  newVisit: PropTypes.shape({
    carSegment: PropTypes.string,
    city: PropTypes.string,
    companyName: PropTypes.string,
    country: PropTypes.string,
    email: PropTypes.string,
    engineType: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    licensePlate: PropTypes.string,
    manufacturedYear: PropTypes.number,
    manufacturerId: PropTypes.number,
    manufacturer: PropTypes.string,
    modelId: PropTypes.number,
    modelName: PropTypes.string,
    notes: PropTypes.string,
    performedServices: PropTypes.array,
    phone: PropTypes.string,
    visitStatus: PropTypes.string,
    streetAddress: PropTypes.string,
    transmission: PropTypes.string,
    usedParts: PropTypes.array,
    userId: PropTypes.number,
    vehicleId: PropTypes.number,
    vin: PropTypes.string,
    visitEnd: PropTypes.string,
    visitStart: PropTypes.string,
    addressId: PropTypes.number
  }),
  setNewVehicle: PropTypes.func,
  setCreated: PropTypes.func
};

export default VehicleCard;
