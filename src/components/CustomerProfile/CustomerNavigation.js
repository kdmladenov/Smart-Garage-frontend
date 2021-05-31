// import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { MDBBtn } from 'mdbreact';
import { Form } from 'react-bootstrap';

const CustomerNavigation = ({ setContent, setQuery, username, vehicles }) => {
  const [selected, setSelected] = useState('all');
  const [input, setInput] = useState({
    visitRangeLow: '',
    visitRangeHight: new Date().toLocaleDateString('fr-CA')
  });

  const handleClick = (vehicleId) => {
    setContent('history');
    setSelected(vehicleId);
    setQuery(`&vehicleId=${vehicleId}&visitRangeHight=${input.visitRangeHight}&visitRangeLow=${input.visitRangeLow}`);
  };

  const createNavBtn = (licensePlate, vehicleId) => {
    return (
      <Form.Group key={vehicleId}>
        <MDBBtn
          active={selected === vehicleId}
          className="btn btn-lg btn-block"
          onClick={() => handleClick(vehicleId, licensePlate)}
        >
          {licensePlate}
        </MDBBtn>
      </Form.Group>
    );
  };

  return (
    <div className="card-body">
      <div className="account-settings">
        <div className="user-profile">
          <h4 className="user-name">{username}</h4>
        </div>
        <div className="about">
          <Form.Group>
            <MDBBtn
              variant="primary"
              className="btn btn-lg btn-block"
              onClick={() => setContent('changePassword')}
            >
              Change Password
            </MDBBtn>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Date Range From
            </Form.Label>
            <Form.Control
              type="date"
              name="visitRangeLow"
              placeholder="From:"
              value={input.visitRangeLow}
              onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Date Range To
            </Form.Label>
            <Form.Control
              type="date"
              name="visitRangeHight"
              placeholder="To:"
              value={input.visitRangeHight}
              onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            />
          </Form.Group>
          <Form.Group >
            <MDBBtn
              active={selected === 'all'}
              className="btn btn-lg btn-block"
              onClick={() => {
                setContent('history');
                setSelected('all');
                setQuery(`&visitRangeHight=${input.visitRangeHight}&visitRangeLow=${input.visitRangeLow}`);
              }}
            >
              All visits
            </MDBBtn>
          </Form.Group>
          {vehicles.map(v => createNavBtn(v.licensePlate, v.vehicleId))}
        </div>
      </div>
    </div>
  );
};

CustomerNavigation.propTypes = {
  setContent: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  vehicles: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CustomerNavigation;
