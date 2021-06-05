import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import CustomToggle from '../UI/Accordion/CustomToggle';
import CustomerCardDetailed from './CustomerCardDetailed';
import VehicleCard from '../Vehicles.js/VehicleCard';
// import { useLocation } from 'react-router';
import useHttp from '../../hooks/useHttp';
import { BASE_URL } from '../../common/constants';
// import Loading from '../UI/Loading';
import './Customers.css';
import DeleteButtonWithPopover from '../UI/DeleteButtonWithPopover/DeleteButtonWithPopover';
import { getToken } from '../../providers/AuthContext';
import { MDBBtn } from 'mdbreact';

const CustomerCard = ({ customer, registerCustomerMode, setRegisterCustomerMode, allCurrencies }) => {
  const [editMode, setEditMode] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [registerVehicleMode, setRegisterVehicleMode] = useState(false);
  const [newCustomerId, setNewCustomerId] = useState(customer.userId);
  // const [error, setError] = useState('');
  // const { search: query } = useLocation();
  const {
    data
    // setLocalData,
    // loading
    // error
  } = useHttp(`${BASE_URL}/vehicles?userId=${customer.userId}`, 'GET', []);

  // if (loading) {
  //   return <Loading />;
  // }
  // // if (error === '404') {
  // //   history.push('*');
  // // } else if (error) {
  // //   history.push('/serviceUnavailable');
  // // }

  const handleDeleteButton = () => {
    fetch(`${BASE_URL}/users/${customer.userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          throw new Error(result.message);
        }
        setIsDeleted(!isDeleted);
      });
    // .catch((e) => setError(e.message));
  };

  const emptyVehicle = {
    // userId: customer.userId || newCustomerId,
    vin: '',
    licensePlate: '',
    engineType: '',
    transmission: '',
    manufacturedYear: '',
    modelName: '',
    manufacturer: '',
    carSegment: ''
  };
  // `{${customer.userId}` || `${newCustomerId}}`
  // useEffect(() => {
  //   emptyVehicle.userId = customer.userId || newCustomerId;
  // }, [customer, newCustomerId]);

  const vehiclesListToShow = (
    <div className="vehicle-list">
      {data.map((vehicle) => {
        return (
          <VehicleCard
            key={vehicle.vehicleId}
            vehicle={vehicle}
            registerVehicleMode={registerVehicleMode}
            setRegisterVehicleMode={setRegisterVehicleMode}
            allCurrencies={allCurrencies}
          />
        );
      })}
    </div>
  );

  if (registerCustomerMode) {
    return (
      <Card>
        <Card.Header className="card-header">
          <div className="register-header card-header-text">Register New Customer</div>
        </Card.Header>
        <Card.Body>
          <CustomerCardDetailed
            key={customer.userId}
            customer={customer}
            editMode={editMode}
            setEditMode={setEditMode}
            registerCustomerMode={registerCustomerMode}
            setRegisterCustomerMode={setRegisterCustomerMode}
            newCustomerId={newCustomerId}
            setNewCustomerId={setNewCustomerId}
          />
        </Card.Body>
        <Card.Header className="card-header">
          <div className="register-header card-header-text">Register New Vehicle</div>
        </Card.Header>
        <Card.Body>
          <VehicleCard
            // key={vehicle.vehicleId}
            vehicle={emptyVehicle}
            registerVehicleMode={registerVehicleMode}
            setRegisterVehicleMode={setRegisterVehicleMode}
            registerCustomerMode={registerCustomerMode}
            setRegisterCustomerMode={setRegisterCustomerMode}
            newCustomerId={newCustomerId}
          />
        </Card.Body>
      </Card>
    );
  };

  return (
    !isDeleted && (
      <>
        <Accordion>
          <Card key={customer.userId}>
            <Card.Header className="card-header">
              <div className="card-header-text customer-name">{customer.fullName}</div>
              <div className="card-header-buttons">
                <MDBBtn type="button" onClick={() => setRegisterVehicleMode(!registerVehicleMode)}>
                  Add Car
                </MDBBtn>
                <CustomToggle variant="primary" eventKey="1" customFunc={setEditMode}>
                  Details
                </CustomToggle>
                <CustomToggle variant="primary" eventKey="2" customFunc={setEditMode}>
                  Car List
                </CustomToggle>
                <DeleteButtonWithPopover handleDeleteButton={handleDeleteButton} />
              </div>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <CustomerCardDetailed
                  key={customer.userId}
                  customer={customer}
                  editMode={editMode}
                  setEditMode={setEditMode}
                  registerCustomerMode={registerCustomerMode}
                  setRegisterCustomerMode={setRegisterCustomerMode}
                />
              </Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                {data.length ? <ul>{vehiclesListToShow}</ul> : <h2> No vehicles found on this customer </h2>}
              </Card.Body>
            </Accordion.Collapse>
            {registerVehicleMode && (
              <Card.Body>
                <VehicleCard
                  // key={vehicle.vehicleId}
                  vehicle={emptyVehicle}
                  registerVehicleMode={registerVehicleMode}
                  setRegisterVehicleMode={setRegisterVehicleMode}
                />
              </Card.Body>
            )}
          </Card>
        </Accordion>
      </>
    )
  );
};

CustomerCard.defaultProps = {
  fullName: '',
  firstName: '',
  lastName: '',
  companyName: '',
  street: '',
  visitEndDate: '',
  userId: null,
  phone: '',
  email: '',
  city: '',
  country: '',
  postalCode: '',
  streetAddress: '',
  role: '',
  licensePlate: '',
  make: '',
  modelId: null,
  model: '',
  vehicleId: null,
  vin: '',
  visitId: null,
  visitStartDate: '',
  visitStatus: ''
};

CustomerCard.propTypes = {
  customer: PropTypes.shape({
    userId: PropTypes.number,
    fullName: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    companyName: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    postalCode: PropTypes.number,
    streetAddress: PropTypes.string,
    licensePlate: PropTypes.string,
    make: PropTypes.string,
    modelId: PropTypes.number,
    model: PropTypes.string,
    vehicleId: PropTypes.number,
    vin: PropTypes.string,
    visitEndDate: PropTypes.string,
    visitId: PropTypes.number,
    visitStartDate: PropTypes.string,
    visitStatus: PropTypes.string,
    role: PropTypes.string
  }).isRequired,
  registerCustomerMode: PropTypes.bool.isRequired,
  setRegisterCustomerMode: PropTypes.func.isRequired,
  allCurrencies: PropTypes.array.isRequired
};

export default CustomerCard;
