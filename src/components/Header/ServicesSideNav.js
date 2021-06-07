import { MDBBtn } from 'mdbreact';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { servicePrice } from '../../common/constants';
import MultiRangeSlider from '../UI/MultiRangeSlider/MultiRangeSlider';
import carSegmentEnum from '../../common/car-segment.enum';

const ServicesSideNav = ({ setCreateServiceMode, createServiceMode, setServicesQuery }) => {
  const [minValue, setMinValue] = useState(servicePrice.MIN);
  const [maxValue, setMaxValue] = useState(servicePrice.MAX);
  const [carSegment, setCarSegment] = useState('');
  const [serviceName, setServiceName] = useState('');

  return (
    <div className="side-nav-content">
      <Form.Group>
        <MDBBtn className="btn btn-lg btn-block" type="button" onClick={() => setCreateServiceMode(!createServiceMode)}>
          {!createServiceMode ? 'Create New Service' : 'Close Create Form'}
        </MDBBtn>
      </Form.Group>
      <Form.Group className="search-field">
        <Form.Label>
          Search By Service Name
        </Form.Label>
        <Form.Control
          type="text"
          name="serviceName"
          value={serviceName}
          placeholder="Enter Part Name"
          onChange={(e) => setServiceName(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="search-field">
        <Form.Label>
          Search By Car Segment
        </Form.Label>
        <Form.Control
          as="select"
          name="carSegment"
          value={carSegment}
          onChange={(e) => setCarSegment(e.target.value)}
        >
          <option value="">Select Car Segment</option>
          {Object.keys(carSegmentEnum).map(key => ({ id: key, carSegment: carSegmentEnum[key] })).map((cs) => (
            <option key={cs.id} value={cs.carSegment}>
              {cs.carSegment}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <div>Search by Price in Range</div>
      <MultiRangeSlider
        min={servicePrice.MIN}
        max={servicePrice.MAX}
        minValue={minValue}
        maxValue={maxValue}
        setMinValue={setMinValue}
        setMaxValue={setMaxValue}
      />
      <Form.Group className="search-field">
        <MDBBtn
          className="btn btn-lg btn-block search"
          onClick={() => {
            setServicesQuery(`?priceLow=${minValue}&priceHigh=${maxValue}&serviceName=${serviceName}&carSegment=${carSegment}`);
          }}
        >
          search
        </MDBBtn>
      </Form.Group>
      <Form.Group className="search-field">
        <MDBBtn
          className="btn btn-lg btn-block search"
          onClick={() => {
            setMinValue(servicePrice.MIN);
            setMaxValue(servicePrice.MAX);
            setCarSegment('');
            setServiceName('');
            setServicesQuery('?');
          }}
        >
          clear search
        </MDBBtn>
      </Form.Group>
    </div>
  );
};

ServicesSideNav.propTypes = {
  setCreateServiceMode: PropTypes.func.isRequired,
  createServiceMode: PropTypes.bool.isRequired,
  setServicesQuery: PropTypes.func.isRequired
};

export default ServicesSideNav;
