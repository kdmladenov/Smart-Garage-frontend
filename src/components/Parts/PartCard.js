import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Parts.css';
import { BASE_URL } from '../../common/constants';
import { getToken } from '../../providers/AuthContext';
import { Card, Form } from 'react-bootstrap';
import { MDBBtn, MDBIcon } from 'mdbreact';
import carSegment from '../../common/car-secment.enum';
import validatePart from './partValidator';

const PartCard = ({ part }) => {
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [parts, setPart] = useState({
    ...part
  });
  const [inputErrors, setInputErrors] = useState({
    name: '',
    price: '',
    carSegment: ''
  });

  const [partCopy, setPartCopy] = useState({
    ...part
  });

  const updatePart = (prop, value) =>
    setPart({ ...parts, [prop]: value });

  const handleInput = (prop, value) => {
    console.log(prop, value);
    setInputErrors({
      ...inputErrors,
      [prop]: validatePart[prop](value)
    });
    updatePart(prop, value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setPartCopy({ ...partCopy, ...parts });
    setEditMode(false);
    setError('');

    fetch(`${BASE_URL}/parts/${part.partId}`, {
      method: 'PUT',
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
      });
  };

  return (
    <Card key={part.partId}>
      <Card.Header className="card-header">
        <Form className="part-detailed">
          <div className="row gutters">
            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-12 col-12 name">
              <Form.Group
                controlId="formBasicName"
                className={inputErrors.name ? 'error' : ''}
              >
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter Part Name"
                  value={parts.name || ''}
                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                  disabled={!editMode}
                />
                {editMode && (
                  <Form.Label className="form-label">{`Part Name${inputErrors.name}`}</Form.Label>
                )}
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
                  value={parts.carSegment}
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
                {editMode && (
                  <Form.Label>{`Car Segment ${inputErrors.carSegment}`}</Form.Label>
                )}
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
                  placeholder="Enter Part Price"
                  value={parts.price}
                  onChange={(e) => handleInput(e.target.name, e.target.value)}
                  disabled={!editMode}
                />
                {editMode && (
                  <Form.Label>{`Price${inputErrors.price} `}</Form.Label>
                )}
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
                  <MDBBtn type="submit" onClick={handleFormSubmit}>
                    <MDBIcon icon="check" />
                  </MDBBtn>
                  <MDBBtn
                    type="button"
                    onClick={() => {
                      setEditMode(false);
                      setPart(partCopy);
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
                <MDBBtn
                  type="button"
                  onClick={() => {
                    setEditMode(true);
                  }}
                >
                  <MDBIcon icon="edit" />
                </MDBBtn>
              )}
            </div>
          </div>
        </Form>
      </Card.Header>
    </Card>
  );
};

PartCard.propTypes = {
  part: PropTypes.shape({
    partId: PropTypes.number.isRequired,
    carSegmentId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    carSegment: PropTypes.string.isRequired
  }).isRequired
};

export default PartCard;
