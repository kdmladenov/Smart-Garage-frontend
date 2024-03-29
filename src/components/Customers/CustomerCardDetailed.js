import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import validateInput from '../Login/userValidator';
import { BASE_URL } from '../../common/constants';
import './CustomerCardDetailed.css';
import { MDBIcon } from 'mdbreact';
import { getToken } from '../../providers/AuthContext';
import roleType from '../../common/role-type.enum';

const CustomerCardDetailed = ({
  customer,
  editMode,
  setEditMode,
  registerCustomerMode,
  setRegisterCustomerMode,
  setNewCustomerId,
  setCustomerFullName
}) => {
  const [error, setError] = useState('');
  const [user, setUser] = useState({ ...customer, reenteredEmail: customer.email });
  const [inputErrors, setInputErrors] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    phone: '',
    email: '',
    reenteredEmail: '',
    country: '',
    city: '',
    postalCode: '',
    role: '',
    streetAddress: ''
  });

  const [userCopy, setUserCopy] = useState({ ...customer, reenteredEmail: customer.email });

  const updateUser = (prop, value) => setUser({ ...user, [prop]: value });

  const handleInput = (prop, value, match) => {
    setInputErrors({ ...inputErrors, [prop]: validateInput[prop](value, match) });
    updateUser(prop, value);
  };

  const isValid = registerCustomerMode
    ? Object.values(inputErrors).every((v) => v === '') && Object.values(user).every((v) => v)
    : Object.values(inputErrors).every((v) => v === '');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Case for register customer
    if (registerCustomerMode && isValid) {
      fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(user)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            setError(res.message);
          } else {
            setNewCustomerId(res.id);
            setCustomerFullName(`${res.firstName} ${res.lastName}`);
            setUserCopy({ ...userCopy, ...user });
          }
        });
    }

    // Case for edit customer
    if (editMode && isValid) {
      fetch(`${BASE_URL}/users/${customer.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(user)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            setError(res.message);
          } else {
            setEditMode(false);
            setCustomerFullName(`${res.firstName} ${res.lastName}`);
            setUserCopy({ ...userCopy, ...user });
          }
        });
    }
  };

  return (
    <div>
      <Form className="customer-detailed">
        <div className="row gutters">
          <div className="col-12 buttons">
            {error && (
              <Form.Group className="error">
                <p>{`${error}`}</p>
              </Form.Group>
            )}
            {(editMode || registerCustomerMode) && (
              <>
                <Button type="submit" onClick={handleFormSubmit} disabled={!isValid} style={{ backgroundColor: 'transparent' }}>
                  <MDBIcon icon="check" />
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setRegisterCustomerMode(false);
                    setEditMode(false);
                    setUser(userCopy);
                    setInputErrors({
                      firstName: '',
                      lastName: '',
                      companyName: '',
                      phone: '',
                      email: '',
                      reenteredEmail: '',
                      country: '',
                      city: '',
                      postalCode: '',
                      streetAddress: ''
                    });
                  }}
                >
                  <MDBIcon icon="times" />
                </Button>
              </>
            )}

            {!editMode && !registerCustomerMode && (
              <Button
                type="button"
                onClick={() => {
                  setEditMode(true);
                }}
              >
                <MDBIcon icon="edit" />
              </Button>
            )}
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
            <Form.Group className={inputErrors.firstName ? 'error' : ''}>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Enter First Name"
                value={user.firstName || ''}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                disabled={!editMode && !registerCustomerMode}
              />
              <Form.Label>{`First Name${inputErrors.firstName}`}</Form.Label>
            </Form.Group>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
            <Form.Group className={inputErrors.lastName ? 'error' : ''}>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                value={user.lastName || ''}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                disabled={!editMode && !registerCustomerMode}
              />
              <Form.Label>{`Last Name${inputErrors.lastName}`}</Form.Label>
            </Form.Group>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
            <Form.Group className={inputErrors.companyName ? 'error' : ''}>
              <Form.Control
                type="text"
                name="companyName"
                placeholder="Enter Company Name"
                value={user.companyName || ''}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                disabled={!editMode && !registerCustomerMode}
              />
              <Form.Label>{`Company Name${inputErrors.companyName}`}</Form.Label>
            </Form.Group>
          </div>
          <div
            className={
              editMode || registerCustomerMode
                ? 'col-xl-5 col-lg-6 col-md-6 col-sm-12 col-12'
                : 'col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12'
            }
          >
            <Form.Group className={inputErrors.email ? 'error' : ''}>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter Email"
                value={user.email}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                disabled={!editMode && !registerCustomerMode}
              />
              <Form.Label>{`Email ${inputErrors.email}`}</Form.Label>
            </Form.Group>
          </div>
          {(editMode || registerCustomerMode) && (
            <div className="col-xl-5 col-lg-6 col-md-6 col-sm-12 col-12">
              <Form.Group className={inputErrors.reenteredEmail ? 'error' : ''}>
                <Form.Control
                  type="email"
                  name="reenteredEmail"
                  placeholder="Confirm Email"
                  value={user.reenteredEmail}
                  onChange={(e) => handleInput(e.target.name, e.target.value, user.email)}
                  disabled={!editMode && !registerCustomerMode}
                />
                <Form.Label>{`Confirm Email ${inputErrors.reenteredEmail}`}</Form.Label>
              </Form.Group>
            </div>
          )}
          <div
            className={
              editMode || registerCustomerMode
                ? 'col-xl-2 col-lg-4 col-md-6 col-sm-6 col-12'
                : 'col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12'
            }
          >
            <Form.Group className={inputErrors.phone ? 'error' : ''}>
              <Form.Control
                type="tel"
                name="phone"
                placeholder="Enter Phone"
                value={user.phone}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                disabled={!editMode && !registerCustomerMode}
              />
              <Form.Label>{`Phone ${inputErrors.phone}`}</Form.Label>
            </Form.Group>
          </div>
          <div className="col-xl-2 col-lg-4 col-md-6 col-sm-6 col-12">
            <Form.Group className={inputErrors.role ? 'error role' : 'role'}>
              <Form.Control
                as="select"
                name="role"
                value={user.role || 'Select User Role'}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                disabled={!editMode && !registerCustomerMode}
              >
                <option value=''>Select User Role</option>
                {Object.keys(roleType).map((k) => (
                  <option value={roleType[k]} key={k}>
                    {roleType[k]}
                  </option>
                ))}
              </Form.Control>
              <Form.Label>{`User Role ${inputErrors.role}`}</Form.Label>
            </Form.Group>
          </div>
          <div className="col-xl-2 col-lg-4 col-md-3 col-sm-4 col-12">
            <Form.Group className={inputErrors.country ? 'error' : ''}>
              <Form.Control
                type="text"
                name="country"
                placeholder="Enter Country"
                value={user.country}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                disabled={!editMode && !registerCustomerMode}
              />
              <Form.Label>{`Country${inputErrors.country}`}</Form.Label>
            </Form.Group>
          </div>
          <div className="col-xl-2 col-lg-3 col-md-3 col-sm-4 col-12">
            <Form.Group className={inputErrors.city ? 'error' : ''}>
              <Form.Control
                type="text"
                name="city"
                placeholder="Enter City"
                value={user.city}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                disabled={!editMode && !registerCustomerMode}
              />
              <Form.Label>{`City${inputErrors.city}`}</Form.Label>
            </Form.Group>
          </div>
          <div className="col-xl-2 col-lg-3 col-md-6 col-sm-4 col-12">
            <Form.Group className={inputErrors.postalCode ? 'error' : ''}>
              <Form.Control
                type="text"
                name="postalCode"
                placeholder="Enter Postal Code"
                value={user.postalCode}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                disabled={!editMode && !registerCustomerMode}
              />
              <Form.Label>{`Postal Code${inputErrors.postalCode}`}</Form.Label>
            </Form.Group>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-12">
            <Form.Group className={inputErrors.streetAddress ? 'error' : ''}>
              <Form.Control
                type="text"
                name="streetAddress"
                placeholder="Enter Street Address"
                value={user.streetAddress || ''}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                disabled={!editMode && !registerCustomerMode}
              />
              <Form.Label>{`Street Address${inputErrors.streetAddress}`}</Form.Label>
            </Form.Group>
          </div>
        </div>
      </Form>
    </div>
  );
};

CustomerCardDetailed.defaultProps = {
  fullName: '',
  firstName: '',
  lastName: '',
  companyName: '',
  street: '',
  visitEnd: '',
  userId: null,
  phone: '',
  email: '',
  city: '',
  country: '',
  postalCode: null,
  streetAddress: '',
  licensePlate: '',
  manufacturer: '',
  modelId: null,
  modelName: '',
  vehicleId: null,
  vin: '',
  visitId: null,
  visitStart: '',
  visitStatus: '',
  setNewCustomerId: () => {},
  editMode: false,
  setEditMode: () => {},
  registerCustomerMode: false,
  setRegisterCustomerMode: () => {},
  setCustomerFullName: () => {}
};

CustomerCardDetailed.propTypes = {
  customer: PropTypes.shape({
    userId: PropTypes.number,
    totalDBItems: PropTypes.number.isRequired,
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
    manufacturer: PropTypes.string,
    modelId: PropTypes.number,
    modelName: PropTypes.string,
    vehicleId: PropTypes.number,
    vin: PropTypes.string,
    visitEnd: PropTypes.string,
    visitId: PropTypes.number,
    visitStart: PropTypes.string,
    visitStatus: PropTypes.string
  }).isRequired,
  editMode: PropTypes.bool,
  setEditMode: PropTypes.func,
  registerCustomerMode: PropTypes.bool,
  setRegisterCustomerMode: PropTypes.func,
  setNewCustomerId: PropTypes.func,
  setCustomerFullName: PropTypes.func
};

export default CustomerCardDetailed;
