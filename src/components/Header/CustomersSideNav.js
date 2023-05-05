import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { BASE_URL } from '../../common/constants';
import { getToken } from '../../providers/AuthContext';
import carSegmentsEnum from '../../common/car-segment.enum';
import sortOptions from '../../common/sort-options.enum';

const CustomersSideNav = ({ setRegisterCustomerMode, registerCustomerMode, setCustomersQuery }) => {
  const [searchParams, setSearchParams] = useState({
    email: '',
    name: '',
    phone: '',
    manufacturer: '',
    modelName: '',
    carSegment: '',
    visitRangeLow: '',
    visitRangeHigh: new Date().toLocaleDateString('fr-CA'),
    sort: { by: '', order: '' }
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
    <div className="side-nav-content customers">
      <Form.Group>
        <Button type="button" className="btn btn-lg btn-block" onClick={() => setRegisterCustomerMode(!registerCustomerMode)}>
          {!registerCustomerMode ? 'New Customer' : 'Close Register Form'}
        </Button>
      </Form.Group>
      <Form.Group className="search-field">
        <Form.Label>
          Sorting Options
        </Form.Label>
        <Form.Control
          as="select"
          name="sort"
          value={searchParams.sortOptions}
          onChange={(e) => setSearchParams({ ...searchParams, [e.target.name]: sortOptions[e.target.value] })}
        >
          <option value="1">Name | ASC</option>
          <option value="2">Name | DESC</option>
          <option value="3">Visit Date | ASC</option>
          <option value="4">Visit Date | DESC</option>
        </Form.Control>
      </Form.Group>
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
        Search By Owner Phone
        </Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          placeholder="Enter Owner Phone"
          value={searchParams.phone}
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
      <Form.Group>
        <Form.Label>
          Date Range From
        </Form.Label>
        <Form.Control
          type="date"
          name="visitRangeLow"
          placeholder="From:"
          value={searchParams.visitRangeLow}
          onChange={(e) => setSearchParams({ ...searchParams, [e.target.name]: e.target.value })}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Date Range To
        </Form.Label>
        <Form.Control
          type="date"
          name="visitRangeHigh"
          placeholder="To:"
          value={searchParams.visitRangeHigh}
          onChange={(e) => setSearchParams({ ...searchParams, [e.target.name]: e.target.value })}
        />
      </Form.Group>
      <Form.Group className="search-field">
        <Button
          className="btn btn-lg btn-block search"
          onClick={() => {
            setCustomersQuery(
              `?name=${searchParams.name}` +
              `&email=${searchParams.email}` +
              `&phone=${searchParams.phone}` +
              `&modelName=${searchParams.modelName}` +
              `&manufacturer=${searchParams.manufacturer}` +
              `&carSegment=${searchParams.carSegment}` +
              `&visitRangeLow=${searchParams.visitRangeLow}` +
              `&visitRangeHigh=${searchParams.visitRangeHigh}` +
              `&sort=${searchParams.sort.by}` +
              `&order=${searchParams.sort.order}`
            );
          }}
        >
          search
        </Button>
      </Form.Group>
      <Form.Group className="search-field">
        <Button
          className="btn btn-lg btn-block search"
          onClick={() => {
            setCustomersQuery('?');
            setSearchParams({
              email: '',
              name: '',
              phone: '',
              manufacturer: '',
              modelName: '',
              carSegment: '',
              visitRangeLow: '',
              visitRangeHigh: new Date().toLocaleDateString('fr-CA'),
              sort: { by: '', order: '' }
            });
          }}
        >
          clear search
        </Button>
      </Form.Group>
    </div>
  );
};

CustomersSideNav.propTypes = {
  setRegisterCustomerMode: PropTypes.func.isRequired,
  registerCustomerMode: PropTypes.bool.isRequired,
  setCustomersQuery: PropTypes.func.isRequired
};

export default CustomersSideNav;
