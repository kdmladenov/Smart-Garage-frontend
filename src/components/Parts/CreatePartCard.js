import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Parts.css';
import { BASE_URL } from '../../common/constants';
import { getToken } from '../../providers/AuthContext';
import { Card, Form } from 'react-bootstrap';
import { MDBBtn, MDBIcon } from 'mdbreact';
import carSegment from '../../common/car-segment.enum';
import validatePart from './partValidator';

const CreatePartCard = ({ setCreatePartMode }) => {
  const [error, setError] = useState('');
  const [parts, setPart] = useState({
    name: '',
    price: '',
    carSegment: ''
  });

  const [inputErrors, setInputErrors] = useState({
    name: '',
    price: '',
    carSegment: ''
  });

  const isValid = Object.values(inputErrors).every((v) => !v) && Object.values(parts).every((v) => v);

  const updatePart = (prop, value) => setPart({ ...parts, [prop]: value });

  const handleInput = (prop, value) => {
    setInputErrors({
      ...inputErrors,
      [prop]: validatePart[prop](value)
    });
    updatePart(prop, value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (isValid) {
      fetch(`${BASE_URL}/parts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(parts)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            setError(res.message);
          }
          setCreatePartMode(false);
        });
    }
  };

  return (
    <Card className="parts-list">
      <Card.Header className="card-create-header">
        <Form className="part-detailed">
          <div className="row gutters">
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 name">
              <Form.Group className={inputErrors.name ? 'error' : ''}>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter Part Name"
                  value={parts.name || ''}
                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                />
                <Form.Label className="visible">{`Part Name${inputErrors.name}`}</Form.Label>
              </Form.Group>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 car-segment">
              <Form.Group className={inputErrors.carSegment ? 'error' : ''}>
                <Form.Control
                  as="select"
                  name="carSegment"
                  value={parts.carSegment}
                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                >
                  <option value="none">Select Car Segment</option>
                  {Object.keys(carSegment).map((k) => (
                    <option value={carSegment[k]} key={k}>
                      {carSegment[k]}
                    </option>
                  ))}
                </Form.Control>
                <Form.Label className="visible">{`Car Segment ${inputErrors.carSegment}`}</Form.Label>
              </Form.Group>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-12 price">
              <Form.Group className={inputErrors.price ? 'error' : ''}>
                <Form.Control
                  type="text"
                  name="price"
                  placeholder="Enter Part Price"
                  value={parts.price}
                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                />
                <Form.Label className="visible">{`Price${inputErrors.price} `}</Form.Label>
              </Form.Group>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12 buttons">
              {error && (
                <Form.Group className="error">
                  <p>{`${error}`}</p>
                </Form.Group>
              )}
              <>
                <MDBBtn type="submit" onClick={handleFormSubmit} disabled={!isValid}>
                  <MDBIcon icon="check" />
                </MDBBtn>
                <MDBBtn
                  type="button"
                  onClick={() => {
                    setCreatePartMode(false);
                    setInputErrors({
                      name: '',
                      price: '',
                      carSegment: ''
                    });
                  }}
                >
                  <MDBIcon icon="times" />
                </MDBBtn>
              </>
            </div>
          </div>
        </Form>
      </Card.Header>
    </Card>
  );
};

CreatePartCard.defaultProps = {
  createPartMode: false
};

CreatePartCard.propTypes = {
  setCreatePartMode: PropTypes.func
};

export default CreatePartCard;
