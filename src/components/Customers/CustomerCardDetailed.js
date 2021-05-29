import React from 'react';
import PropTypes from 'prop-types';
const CustomerCardDetailed = ({ customer }) => {
  return (
    <div>
      <div>{customer.firstName}</div>
      <div>{customer.lastName}</div>
      <div>{customer.companyName}</div>
      <div>{customer.phone}</div>
      <div>{customer.email}</div>
      <div>{customer.country}</div>
      <div>{customer.city}</div>
      <div>{customer.postalCode}</div>
      <div>{customer.street}</div>
    </div>
  );
};

CustomerCardDetailed.defaultProps = {
  fullName: '',
  firstName: '',
  lastName: '',
  companyName: '',
  street: '',
  visitEndDate: ''
};

CustomerCardDetailed.propTypes = {
  customer: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    totalDBItems: PropTypes.number.isRequired,
    fullName: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    companyName: PropTypes.string,
    phone: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    postalCode: PropTypes.number.isRequired,
    street: PropTypes.string,
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

export default CustomerCardDetailed;
