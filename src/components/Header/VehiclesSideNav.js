import { MDBBtn } from 'mdbreact';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { BASE_URL } from '../../common/constants';
import { getToken } from '../../providers/AuthContext';
import carSegmentsEnum from '../../common/car-segment.enum';

const VehiclesSideNav = ({ setVehiclesQuery }) => {
  const [searchParams, setSearchParams] = useState({
    email: '',
    name: '',
    manufacturer: '',
    modelName: '',
    carSegment: ''
  });
  const [manufacturers, setManufacturers] = useState([]);
  const [modelsData, setModelsData] = useState([]);
  const [models, filterModels] = useState([]);
  const [carSegments, filterCarSegments] = useState([]);

  useEffect(() => {
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
        setModelsData(res);

        const makes = new Set();
        res.forEach((m) => makes.add(m.manufacturer));
        setManufacturers([...makes]);
        filterModels(res.map((m) => m));

        filterCarSegments(Object.keys(carSegmentsEnum).map(key => ({ id: key, carSegment: carSegmentsEnum[key] })));
      });
    // .catch((e) => setError(e.message));
  }, []);

  useEffect(() => {
    if (searchParams.manufacturer) {
      filterModels(modelsData.filter((m) => m.manufacturer === searchParams.manufacturer));
    } else {
      filterModels(modelsData);
    }
  }, [searchParams.manufacturer]);

  useEffect(() => {
    if (searchParams.modelName) {
      filterCarSegments(modelsData.filter((m) => m.modelName === searchParams.modelName));
    } else {
      filterCarSegments(Object.keys(carSegmentsEnum).map(key => ({ id: key, carSegment: carSegmentsEnum[key] })));
    }
  }, [searchParams.modelName]);

  return (
    <div className="side-nav-content">
          <Form.Group className="search-field">
            <Form.Label>
              Search By Owner Email
            </Form.Label>
            <Form.Control
              type="text"
              name="email"
              placeholder="Enter Owner Email"
              value={searchParams.email}
              onChange={(e) => setSearchParams({ ...searchParams, [e.target.name]: e.target.value })}
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group className="search-field">
            <Form.Label>
            Search By Owner Name
            </Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter Owner Name"
              value={searchParams.name}
              onChange={(e) => setSearchParams({ ...searchParams, [e.target.name]: e.target.value })}
              autoComplete="off"
            />
          </Form.Group>
          <Form.Group className="search-field">
            <Form.Label>
              Search By Manufacturer
            </Form.Label>
            <Form.Control
              as="select"
              name="manufacturer"
              value={searchParams.manufacturer}
              onChange={(e) => setSearchParams({ ...searchParams, [e.target.name]: e.target.value })}
            >
              <option value="">Select Manufacturer</option>
              {manufacturers.map((manuf) => (
                <option key={manuf} value={manuf}>
                  {manuf}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="search-field">
            <Form.Label>
              Search By Model
            </Form.Label>
            <Form.Control
              as="select"
              name="modelName"
              value={searchParams.modelName}
              onChange={(e) => setSearchParams({ ...searchParams, [e.target.name]: e.target.value })}
            >
              <option value="">Select Model</option>
              {models.map((model) => (
                <option key={model.modelId} value={model.modelName}>
                  {model.modelName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="search-field">
            <Form.Label>
              Search By Car Segment
            </Form.Label>
            <Form.Control
              as="select"
              name="carSegment"
              value={searchParams.carSegment}
              onChange={(e) => setSearchParams({ ...searchParams, [e.target.name]: e.target.value })}
            >
              <option value="">Select Car Segment</option>
              {carSegments.map((m) => (
                  <option key={m.modelId || m.id} value={m.carSegment}>
                    {m.carSegment}
                  </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group className="search-field">
            <MDBBtn
              className="btn btn-lg btn-block search"
              onClick={() => {
                setVehiclesQuery(`?fullName=${searchParams.name}&email=${searchParams.email}&manufacturer=${searchParams.manufacturer}&modelName=${searchParams.modelName}&carSegment=${searchParams.carSegment}`);
              }}
            >
              search
            </MDBBtn>
          </Form.Group>
          <Form.Group className="search-field">
            <MDBBtn
              className="btn btn-lg btn-block search"
              onClick={() => {
                setSearchParams({
                  email: '',
                  name: '',
                  manufacturer: '',
                  modelName: '',
                  carSegment: ''
                });
                filterModels(modelsData);
                filterCarSegments(Object.keys(carSegmentsEnum).map(key => ({ id: key, carSegment: carSegmentsEnum[key] })));
                setVehiclesQuery('');
              }}
            >
              clear search
            </MDBBtn>
          </Form.Group>
    </div>
  );
};

VehiclesSideNav.propTypes = {
  setVehiclesQuery: PropTypes.func.isRequired
};

export default VehiclesSideNav;
