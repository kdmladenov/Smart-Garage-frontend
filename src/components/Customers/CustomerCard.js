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
import Loading from '../UI/Loading';
import './Customers.css';
import DeleteButtonWithPopover from '../UI/DeleteButtonWithPopover/DeleteButtonWithPopover';
import { getToken } from '../../providers/AuthContext';

const CustomerCard = ({ customer }) => {
  const [editMode, setEditMode] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  // const [error, setError] = useState('');

  // const { search: query } = useLocation();
  const {
    data,
    // setLocalData,
    loading
    // error
  } = useHttp(`${BASE_URL}/vehicles?userId=${customer.userId}`, 'GET', []);

  if (loading) {
    return <Loading />;
  }
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

  const vehiclesListToShow = (
    <div className="vehicle-list">
      {data.map((vehicle) => {
        return (
          <VehicleCard
            key={vehicle.vehicleId}
            vehicle={vehicle}
          />
        );
      })}
    </div>
  );
  return !isDeleted && (
    <>
      <Accordion>
        <Card key={customer.userId}>
          <Card.Header className="card-header">
            <div className="card-header-text customer-name">{customer.fullName}</div>
            <div className="card-header-buttons">
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
              />
            </Card.Body>
          </Accordion.Collapse>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              {data.length ? <ul>{vehiclesListToShow}</ul> : <h2> No vehicles found on this customer </h2>}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </>
  );
}; ;

CustomerCard.defaultProps = {
  fullName: '',
  firstName: '',
  lastName: '',
  companyName: '',
  street: '',
  visitEndDate: ''
};

CustomerCard.propTypes = {
  customer: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    fullName: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    companyName: PropTypes.string,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    postalCode: PropTypes.number.isRequired,
    streetAddress: PropTypes.string,
    licensePlate: PropTypes.string.isRequired,
    make: PropTypes.string.isRequired,
    modelId: PropTypes.number.isRequired,
    model: PropTypes.string.isRequired,
    vehicleId: PropTypes.number.isRequired,
    vin: PropTypes.string.isRequired,
    visitEndDate: PropTypes.string,
    visitId: PropTypes.number.isRequired,
    visitStartDate: PropTypes.string.isRequired,
    visitStatus: PropTypes.string.isRequired
  }).isRequired
};

export default CustomerCard;
