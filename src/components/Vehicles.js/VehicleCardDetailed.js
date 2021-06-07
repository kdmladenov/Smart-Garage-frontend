import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import validateInput from './vehicleValidator';
import { BASE_URL } from '../../common/constants';
import { getToken } from '../../providers/AuthContext';
import { MDBBtn, MDBIcon } from 'mdbreact';
import transmission from '../../common/transmission.enum';
import engineType from '../../common/engine-type.enum';
import carSegmentsEnum from '../../common/car-segment.enum';
import './VehicleCardDetailed.css';

const VehicleCardDetailed = ({
  vehicle: vehicleData,
  editMode,
  setEditMode,
  registerVehicleMode,
  setRegisterVehicleMode,
  registerCustomerMode,
  setRegisterCustomerMode,
  newCustomerId,
  setNewVehicle
}) => {
  const [error, setError] = useState('');
  const [vehicle, setVehicle] = useState({ ...vehicleData });
  const [inputErrors, setInputErrors] = useState({
    vin: '',
    licensePlate: '',
    engineType: '',
    transmission: '',
    manufacturedYear: '',
    modelName: '',
    manufacturer: '',
    carSegment: ''
  });
  const [vehicleCopy, setVehicleCopy] = useState({ ...vehicleData });
  const [manufacturers, setManufacturers] = useState([]);
  const [modelsData, setModelsData] = useState([]);
  const [models, filterModels] = useState([]);
  const [carSegments, filterCarSegments] = useState([]);

  useEffect(() => {
    let isMounted = true;
    fetch(`${BASE_URL}/models`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((res) => {
        if (isMounted) {
          setModelsData([...res]);

          const makes = new Set();
          res.forEach((m) => makes.add(m.manufacturer));
          setManufacturers([...makes]);

          filterModels([...res]);
          filterCarSegments(Object.keys(carSegmentsEnum).map(key => ({ carSegmentId: key, carSegment: carSegmentsEnum[key] })));
        }
      })
      .catch((e) => {
        if (isMounted) {
          setError(e.message);
        }
      });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    filterModels(modelsData.filter(m => (modelsData.some(m => m.manufacturer === vehicle.manufacturer)) ? m.manufacturer === vehicle.manufacturer : m.manufacturer));
    // if (manufacturers.some(m => m.manufacturer === vehicle.manufacturer)) {
    //   filterModels(modelsData.filter(m => m.manufacturer === vehicle.manufacturer));
    // } else {
    //   filterModels([...modelsData]);
    // }
  }, [vehicle.manufacturer]);

  useEffect(() => {
    if (modelsData.some(m => m.modelName === vehicle.modelName)) {
      filterCarSegments(modelsData.filter((m) => m.modelName === vehicle.modelName && m.manufacturer === vehicle.manufacturer));
    } else {
      filterCarSegments(Object.keys(carSegmentsEnum).map(key => ({ carSegmentId: key, carSegment: carSegmentsEnum[key] })));
    }
  }, [vehicle.modelName]);

  const updateVehicle = (prop, value) => setVehicle({ ...vehicle, [prop]: value });

  const handleInput = (prop, value) => {
    setInputErrors({ ...inputErrors, [prop]: validateInput[prop](value) });
    updateVehicle(prop, value);
  };

  const isValid =
    registerVehicleMode || registerCustomerMode
      ? Object.values(inputErrors).every((v) => v === '') &&
        Object.values({ ...vehicle, userId: newCustomerId || vehicle.userId }).every((v) => v)
      : Object.values(inputErrors).every((v) => v === '');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Case for register
    if ((registerVehicleMode || registerCustomerMode) && isValid) {
      fetch(`${BASE_URL}/vehicles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({ ...vehicle, userId: newCustomerId || vehicle.userId })
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            setError(res.message);
          } else {
            setNewVehicle(res);
          }
        });
    }

    // Case for edit
    if (editMode && isValid) {
      fetch(`${BASE_URL}/vehicles/${vehicle.vehicleId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(vehicle)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            setError(res.message);
          } else {
            setVehicleCopy({ ...vehicleCopy, ...vehicle });
            setEditMode(false);
          }
        });
    }
  };

  console.log(models, 'models');
  console.log(vehicle, 'vehicle');
  console.log(carSegments, 'carSegments');

  return (
    <div>
      <Form className="vehicle-detailed">
        <div className="row gutters">
          <div className="col-12 buttons">
            {error && (
              <Form.Group className="error">
                <p>{`${error}`}</p>
              </Form.Group>
            )}
            {(editMode || registerVehicleMode || registerCustomerMode) && (
              <>
                <MDBBtn type="submit" onClick={handleFormSubmit} disabled={!isValid}>
                  <MDBIcon icon="check" />
                </MDBBtn>
                <MDBBtn
                  type="button"
                  onClick={() => {
                    setEditMode(false);
                    setRegisterCustomerMode(false);
                    setVehicle(vehicleCopy);
                    setInputErrors({
                      vin: '',
                      licensePlate: '',
                      engineType: '',
                      transmission: '',
                      manufacturedYear: '',
                      modelName: '',
                      manufacturer: '',
                      carSegment: ''
                    });
                    setError('');
                  }}
                >
                  <MDBIcon icon="times" />
                </MDBBtn>
              </>
            )}
            {!editMode && !(registerVehicleMode || registerCustomerMode) && (
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
          <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12">
            <Form.Group className={inputErrors.vin ? 'error' : ''}>
              <Form.Control
                type="text"
                name="vin"
                placeholder="Enter VIN"
                value={vehicle.vin}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                disabled={!(registerVehicleMode || registerCustomerMode)}
              />
              <Form.Label>{`VIN${inputErrors.vin}`}</Form.Label>
            </Form.Group>
          </div>
          <div className="col-xl-2 col-lg-6 col-md-6 col-sm-12 col-12">
            <Form.Group className={inputErrors.licensePlate ? 'error' : ''}>
              <Form.Control
                type="text"
                name="licensePlate"
                placeholder="License Plate"
                value={vehicle.licensePlate}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                disabled={!registerVehicleMode && !registerCustomerMode}
              />
              <Form.Label>{`License Plate${inputErrors.licensePlate}`}</Form.Label>
            </Form.Group>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
            <Form.Group className={inputErrors.engineType ? 'error' : ''}>
              <Form.Control
                as="select"
                name="engineType"
                value={vehicle.engineType || 'Select Engine Type'}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                disabled={!editMode && !(registerVehicleMode || registerCustomerMode)}
              >
                <option value="">Select Engine Type</option>
                {Object.keys(engineType).map((k) => (
                  <option key={k} value={engineType[k]}>
                    {engineType[k]}
                  </option>
                ))}
              </Form.Control>
              <Form.Label>{`Engine Type${inputErrors.engineType}`}</Form.Label>
            </Form.Group>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
            <Form.Group className={inputErrors.transmission ? 'error' : ''}>
              <Form.Control
                as="select"
                name="transmission"
                value={vehicle.transmission || 'Select Transmission'}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                disabled={!editMode && !(registerVehicleMode || registerCustomerMode)}
              >
                <option value="">Select Transmission</option>
                {Object.keys(transmission).map((k) => (
                  <option key={k} value={transmission[k]}>
                    {transmission[k]}
                  </option>
                ))}
              </Form.Control>
              <Form.Label>{`Transmission ${inputErrors.transmission}`}</Form.Label>
            </Form.Group>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
            <Form.Group className={inputErrors.manufacturer ? 'error' : ''}>
              <Form.Control
                type="text"
                list="manufacturers"
                name="manufacturer"
                value={vehicle.manufacturer}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                disabled={!(registerVehicleMode || registerCustomerMode)}
              />
              <datalist id="manufacturers">
                {manufacturers.map(manuf => <option key={manuf}>{manuf}</option>)}
              </datalist>
              <Form.Label>{`Manufacturer${inputErrors.manufacturer}`}</Form.Label>
            </Form.Group>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
          <Form.Group className={inputErrors.modelName ? 'error' : ''}>
              <Form.Control
                type="text"
                list="models"
                name="modelName"
                value={vehicle.modelName}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                disabled={!(registerVehicleMode || registerCustomerMode)}
              />
              <datalist id="models">
                {models.map(m => <option key={m.modelId}>{m.modelName}</option>)}
              </datalist>
              <Form.Label>{`Model${inputErrors.modelName}`}</Form.Label>
            </Form.Group>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
            <Form.Group className={inputErrors.carSegment ? 'error' : ''}>
              <Form.Control
                as="select"
                name="carSegment"
                value={vehicle.carSegment}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                disabled={!(registerVehicleMode || registerCustomerMode)}
              >
                <option value="">Select Car Segment</option>
                {carSegments.map((m) => (
                  <option key={m.carSegmentId} value={m.carSegment}>
                    {m.carSegment}
                  </option>
                ))}
              </Form.Control>
              <Form.Label>{`Car Segment${inputErrors.carSegment}`}</Form.Label>
            </Form.Group>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
            <Form.Group className={inputErrors.manufacturedYear ? 'error' : ''}>
              <Form.Control
                type="number"
                name="manufacturedYear"
                placeholder="Year of Manufacturing"
                value={vehicle.manufacturedYear}
                onChange={(e) => handleInput(e.target.name, e.target.value)}
                disabled={!editMode && !(registerVehicleMode || registerCustomerMode)}
              />
              <Form.Label>{`Year of Manufacturing ${inputErrors.manufacturedYear}`}</Form.Label>
            </Form.Group>
          </div>
        </div>
      </Form>
    </div>
  );
};

VehicleCardDetailed.defaultProps = {
  carSegment: '',
  carSegmentId: '',
  companyName: '',
  email: '',
  engineType: '',
  fullName: '',
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
  setNewCustomerId: () => {},
  editMode: false,
  setEditMode: () => {},
  registerCustomerMode: false,
  setRegisterCustomerMode: () => {},
  registerVehicleMode: false,
  setRegisterVehicleMode: () => {},
  newCustomerId: null,
  setNewVehicle: () => {}
};

VehicleCardDetailed.propTypes = {
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
  editMode: PropTypes.bool,
  setEditMode: PropTypes.func,
  registerVehicleMode: PropTypes.bool,
  setRegisterVehicleMode: PropTypes.func,
  registerCustomerMode: PropTypes.bool,
  setRegisterCustomerMode: PropTypes.func,
  newCustomerId: PropTypes.number,
  setNewVehicle: PropTypes.func
};

export default VehicleCardDetailed;
