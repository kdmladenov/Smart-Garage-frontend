import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Services.css';
import { BASE_URL } from '../../common/constants';
import { getToken } from '../../providers/AuthContext';
import { Card, Form } from 'react-bootstrap';
import { MDBBtn, MDBIcon, MDBPopover, MDBPopoverBody, MDBPopoverHeader } from 'mdbreact';
import carSegment from '../../common/car-secment.enum';
import validateService from './serviceValidator';

const ServiceCard = ({ service }) => {
  const [editMode, setEditMode] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [error, setError] = useState('');
  const [services, setService] = useState({
    ...service
  });
  const [inputErrors, setInputErrors] = useState({
    name: '',
    price: '',
    carSegment: ''
  });

  const [serviceCopy, setServiceCopy] = useState({
    ...service
  });

  const updateService = (prop, value) =>
    setService({ ...services, [prop]: value });

  const handleInput = (prop, value) => {
    setInputErrors({
      ...inputErrors,
      [prop]: validateService[prop](value)
    });
    updateService(prop, value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setServiceCopy({ ...serviceCopy, ...services });
    setEditMode(false);
    setError('');

    if (isValid) {
      fetch(`${BASE_URL}/services/${service.serviceId}`, {
        method: 'PUT',
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
          }
        });
    }
  };

  const handleDeleteButton = () => {
    fetch(`${BASE_URL}/services/${service.serviceId}`, {
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
      })
      .catch((e) => setError(e.message));
  };

  const isValid = Object.values(inputErrors).every((v) => !v);

  return (
    !isDeleted && (
      <Card key={service.serviceId}>
        <Card.Header className="card-header service-detailed">
          <Form className="service-detailed">
            <div className="row gutters">
              <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 name">
                <Form.Group
                  controlId="formBasicName"
                  className={inputErrors.name ? 'error' : ''}
                >
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter Service Name"
                    value={services.name || ''}
                    onChange={(e) => handleInput(e.target.name, e.target.value)}
                    disabled={!editMode}
                  />
                  <Form.Label
                    className={editMode ? 'visible' : ''}
                  >{`Service Name${inputErrors.name}`}</Form.Label>
                </Form.Group>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12 car-segment">
                <Form.Group
                  controlId="formBasicCarSegment"
                  className={inputErrors.carSegment ? 'error' : ''}
                >
                  <Form.Control
                    as="select"
                    name="carSegment"
                    value={services.carSegment}
                    onChange={(e) => handleInput(e.target.name, e.target.value)}
                    disabled={!editMode}
                  >
                    <option value="none">Select Car Segment</option>
                    {Object.keys(carSegment).map((k) => (
                      <option value={carSegment[k]} key={k}>
                        {carSegment[k]}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Label
                    className={editMode ? 'visible' : ''}
                  >{`Car Segment ${inputErrors.carSegment}`}</Form.Label>
                </Form.Group>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-2 col-sm-6 col-12 price">
                <Form.Group
                  controlId="formBasicPrice"
                  className={inputErrors.price ? 'error' : ''}
                >
                  <Form.Control
                    type="text"
                    name="price"
                    placeholder="Enter Service Price"
                    value={services.price}
                    onChange={(e) => handleInput(e.target.name, e.target.value)}
                    disabled={!editMode}
                  />
                  <Form.Label
                    className={editMode ? 'visible' : ''}
                  >{`Price${inputErrors.price} `}</Form.Label>
                </Form.Group>
              </div>
              <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12 buttons">
                {error && (
                  <Form.Group className="error">
                    <p>{`${error}`}</p>
                  </Form.Group>
                )}
                {editMode && (
                  <>
                    <MDBBtn type="submit" onClick={handleFormSubmit} disabled={!isValid}>
                      <MDBIcon icon="check" />
                    </MDBBtn>
                    <MDBBtn
                      type="button"
                      onClick={() => {
                        setEditMode(false);
                        setService(serviceCopy);
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
                )}
                {!editMode && (
                  <>
                    <MDBBtn
                      type="button"
                      onClick={() => {
                        setEditMode(true);
                      }}
                    >
                      <MDBIcon icon="edit" />
                    </MDBBtn>
                    <MDBPopover
                      placement="left"
                      popover
                      clickable
                      id="delete-popover"
                    >
                      <MDBBtn type="button">
                        <MDBIcon icon="trash-alt" />
                      </MDBBtn>
                      <div>
                        <MDBPopoverHeader>Are you sure?</MDBPopoverHeader>
                        <MDBPopoverBody>
                          <MDBBtn
                            color="red"
                            onClick={() => {
                              handleDeleteButton(true);
                            }}
                          >
                            Delete
                          </MDBBtn>
                        </MDBPopoverBody>
                      </div>
                    </MDBPopover>
                  </>
                )}
              </div>
            </div>
          </Form>
        </Card.Header>
      </Card>
    )
  );
};

ServiceCard.propTypes = {
  service: PropTypes.shape({
    serviceId: PropTypes.number.isRequired,
    carSegmentId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    carSegment: PropTypes.string.isRequired
  }).isRequired
};

export default ServiceCard;
