import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Services.css';
import { BASE_URL } from '../../common/constants';
import { getToken } from '../../providers/AuthContext';
import { Button, Card, Form } from 'react-bootstrap';
import { MDBIcon } from 'mdbreact';
import carSegment from '../../common/car-segment.enum';
import validateService from './serviceValidator';

const CreateServiceCard = ({ setCreateServiceMode, data, setData }) => {
  const [error, setError] = useState('');
  const [services, setService] = useState({
    name: '',
    price: '',
    carSegment: ''
  });

  const [inputErrors, setInputErrors] = useState({
    name: '',
    price: '',
    carSegment: ''
  });

  const isValid = Object.values(inputErrors).every((v) => !v) && Object.values(services).every((v) => v);

  const updateService = (prop, value) => setService({ ...services, [prop]: value });

  const handleInput = (prop, value) => {
    setInputErrors({
      ...inputErrors,
      [prop]: validateService[prop](value)
    });
    updateService(prop, value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (isValid) {
      fetch(`${BASE_URL}/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(services)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            setError(res.message);
          } else {
            setData([services, ...data]);
            setService({
              name: '',
              price: '',
              carSegment: ''
            });
          }
        });
    }
  };

  return (
    <Card className="services-list">
      <Card.Header className="card-create-header">
        <Form className="service-detailed">
          <div className="row gutters">
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 name">
              <Form.Group className={inputErrors.name ? 'error' : ''}>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter Service Name"
                  value={services.name || ''}
                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                />
                <Form.Label className="visible">{`Service Name${inputErrors.name}`}</Form.Label>
              </Form.Group>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 car-segment">
              <Form.Group className={inputErrors.carSegment ? 'error' : ''}>
                <Form.Control
                  as="select"
                  name="carSegment"
                  value={services.carSegment}
                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                >
                  <option value=''>Select Car Segment</option>
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
                  placeholder="Enter Service Price"
                  value={services.price}
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
                <Button type="submit" onClick={handleFormSubmit} disabled={!isValid} style={{ backgroundColor: 'transparent' }}>
                  <MDBIcon icon="check" />
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setCreateServiceMode(false);
                    setInputErrors({
                      name: '',
                      price: '',
                      carSegment: ''
                    });
                  }}
                >
                  <MDBIcon icon="times" />
                </Button>
              </>
            </div>
          </div>
        </Form>
      </Card.Header>
    </Card>
  );
};
CreateServiceCard.defaultProps = {
  createServiceMode: false
};

CreateServiceCard.propTypes = {
  setCreateServiceMode: PropTypes.func,
  data: PropTypes.array.isRequired,
  setData: PropTypes.func.isRequired
};

export default CreateServiceCard;
