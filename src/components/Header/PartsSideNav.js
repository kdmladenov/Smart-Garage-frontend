import { MDBBtn } from 'mdbreact';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { partPrice } from '../../common/constants';
import MultiRangeSlider from '../UI/MultiRangeSlider/MultiRangeSlider';
import carSegmentEnum from '../../common/car-segment.enum';

const PartsSideNav = ({ setCreatePartMode, createPartMode, setPartsQuery }) => {
  const [minValue, setMinValue] = useState(partPrice.MIN);
  const [maxValue, setMaxValue] = useState(partPrice.MAX);
  const [carSegment, setCarSegment] = useState('');
  const [partName, setPartName] = useState('');

  return (
    <div className="side-nav-content">
      <Form.Group>
        <MDBBtn className="btn btn-lg btn-block" type="button" onClick={() => setCreatePartMode(!createPartMode)}>
          {!createPartMode ? 'Create New Part' : 'Close Create Form'}
        </MDBBtn>
      </Form.Group>
      <Form.Group className="search-field">
        <Form.Label>
          Search By Part Name
        </Form.Label>
        <Form.Control
          type="text"
          name="partName"
          value={partName}
          placeholder="Enter Part Name"
          onChange={(e) => setPartName(e.target.value)}
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
        min={partPrice.MIN}
        max={partPrice.MAX}
        minValue={minValue}
        maxValue={maxValue}
        setMinValue={setMinValue}
        setMaxValue={setMaxValue}
      />
      <Form.Group className="search-field">
        <MDBBtn
          className="btn btn-lg btn-block search"
          onClick={() => {
            setPartsQuery(`?priceLow=${minValue}&priceHigh=${maxValue}&partName=${partName}&carSegment=${carSegment}`);
          }}
        >
          search
        </MDBBtn>
      </Form.Group>
      <Form.Group className="search-field">
        <MDBBtn
          className="btn btn-lg btn-block search"
          onClick={() => {
            setMinValue(partPrice.MIN);
            setMaxValue(partPrice.MAX);
            setCarSegment('');
            setPartName('');
            setPartsQuery('?');
          }}
        >
          clear search
        </MDBBtn>
      </Form.Group>
    </div>
  );
};

PartsSideNav.propTypes = {
  setCreatePartMode: PropTypes.func.isRequired,
  createPartMode: PropTypes.bool.isRequired,
  setPartsQuery: PropTypes.func.isRequired
};

export default PartsSideNav;
