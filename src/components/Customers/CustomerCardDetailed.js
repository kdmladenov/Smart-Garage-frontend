import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import validateInput from '../Login/userValidator';
import { BASE_URL } from '../../common/constants';
import './CustomerCardDetailed.css';
import { MDBBtn, MDBIcon } from 'mdbreact';
import { getToken } from '../../providers/AuthContext';

const CustomerCardDetailed = ({ customer, editMode, setEditMode }) => {
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
    streetAddress: ''
  });

  const [userCopy, setUserCopy] = useState({ ...customer, reenteredEmail: customer.email });

  const updateUser = (prop, value) => setUser({ ...user, [prop]: value });

  const handleInput = (prop, value) => {
    setInputErrors({ ...inputErrors, [prop]: validateInput[prop](value) });
    updateUser(prop, value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setUserCopy({ ...userCopy, ...user });
    setEditMode(false);
    setError('');

    fetch(`${BASE_URL}/users/${customer.userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          setError(res.message);
        }
      });
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
            {editMode && (
              <>
                <MDBBtn type="submit" onClick={handleFormSubmit}>
                  <MDBIcon icon="check" />
                </MDBBtn>
                <MDBBtn type="button" onClick={() => {
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
                }}>
                  <MDBIcon icon="times" />
                </MDBBtn>
              </>
            )}
            {!editMode &&
              <MDBBtn type="button" onClick={() => {
                setEditMode(true);
              }}>
                <MDBIcon icon="edit" />
              </MDBBtn>
            }
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
            <Form.Group controlId="formBasicFirstName" className={inputErrors.firstName ? 'error' : ''}>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="Enter First Name"
                value={user.firstName || ''}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                disabled={!editMode}
                />
                <Form.Label>
                  {`First Name${inputErrors.firstName}`}
                </Form.Label>
            </Form.Group>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
            <Form.Group controlId="formBasicLastName" className={inputErrors.lastName ? 'error' : ''}>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                value={user.lastName || ''}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                disabled={!editMode}
                />
                <Form.Label>
                  {`Last Name${inputErrors.lastName}`}
                </Form.Label>
            </Form.Group>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
            <Form.Group controlId="formBasicLastName" className={inputErrors.companyName ? 'error' : ''}>
              <Form.Control
                type="text"
                name="companyName"
                placeholder="Enter Company Name"
                value={user.companyName || ''}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                disabled={!editMode}
                />
                <Form.Label>
                  {`Company Name${inputErrors.companyName}`}
                </Form.Label>
            </Form.Group>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <Form.Group controlId="formBasicEmail" className={inputErrors.email ? 'error' : ''}>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter Email"
                value={user.email}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                disabled={!editMode}
                />
                <Form.Label>
                  {`Email ${inputErrors.email}`}
                </Form.Label>
            </Form.Group>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
            <Form.Group controlId="formBasicConfirmEmail" className={inputErrors.reenteredEmail ? 'error' : ''}>
              <Form.Control
                type="email"
                name="reenteredEmail"
                placeholder="Confirm Email"
                value={user.reenteredEmail}
                onChange={(e) => handleInput(e.target.name, e.target.value, user.email)}
                disabled={!editMode}
                />
                <Form.Label>
                  {`Confirm Email ${inputErrors.email}`}
                </Form.Label>
            </Form.Group>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
            <Form.Group controlId="FormBasicPhone" className={inputErrors.phone ? 'error' : ''}>
              <Form.Control
                type="tel"
                name="phone"
                placeholder="Enter Phone"
                value={user.phone}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                disabled={!editMode}
                />
                <Form.Label>
                  {`Phone ${inputErrors.phone}`}
                </Form.Label>
            </Form.Group>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
            <Form.Group controlId="formBasicCountry" className={inputErrors.country ? 'error' : ''}>
              <Form.Control
                type="text"
                name="country"
                placeholder="Enter Country"
                value={user.country}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                disabled={!editMode}
                />
                <Form.Label>
                  {`Country${inputErrors.country}`}
                </Form.Label>
            </Form.Group>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
            <Form.Group controlId="formBasicCity" className={inputErrors.city ? 'error' : ''}>
              <Form.Control
                type="text"
                name="city"
                placeholder="Enter City"
                value={user.city}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                disabled={!editMode}
                />
                <Form.Label>
                  {`City${inputErrors.city}`}
                </Form.Label>
            </Form.Group>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
            <Form.Group controlId="formBasicPostalCode" className={inputErrors.postalCode ? 'error' : ''}>
              <Form.Control
                type="text"
                name="postalCode"
                placeholder="Enter Postal Code"
                value={user.postalCode}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                disabled={!editMode}
                />
                <Form.Label>
                  {`Postal Code${inputErrors.postalCode}`}
                </Form.Label>
            </Form.Group>
          </div>
          <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-12">
            <Form.Group controlId="formBasicStreetAddress" className={inputErrors.streetAddress ? 'error' : ''}>
              <Form.Control
                type="text"
                name="streetAddress"
                placeholder="Enter Street Address"
                value={user.streetAddress || ''}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                disabled={!editMode}
                />
                <Form.Label>
                  {`Street Address${inputErrors.streetAddress}`}
                </Form.Label>
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
  visitEndDate: ''
};

CustomerCardDetailed.propTypes = {
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
  }).isRequired,
  editMode: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func.isRequired
};

export default CustomerCardDetailed;
