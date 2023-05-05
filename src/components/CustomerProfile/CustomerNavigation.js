// import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const CustomerNavigation = ({ setContent, setQuery, username, vehicles }) => {
  const [selected, setSelected] = useState('all');
  const [input, setInput] = useState({
    visitRangeLow: '',
    visitRangeHigh: new Date().toLocaleDateString('fr-CA')
  });

  const handleClick = (vehicleId) => {
    setContent('history');
    setSelected(vehicleId);
    setQuery(`&vehicleId=${vehicleId}&visitRangeHigh=${input.visitRangeHigh}&visitRangeLow=${input.visitRangeLow || '1900-01-01'}`);
  };

  const createNavBtn = (licensePlate, vehicleId) => {
    return (
      <Form.Group key={vehicleId}>
        <Button
          active={selected === vehicleId}
          className="btn btn-lg btn-block"
          onClick={() => handleClick(vehicleId, licensePlate)}
        >
          {licensePlate}
        </Button>
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
            <Button
              active={selected === 'changePassword'}
              variant="primary"
              className="btn btn-lg btn-block"
              onClick={() => {
                setContent('changePassword');
                setSelected('changePassword');
              }}
            >
              Change Password
            </Button>
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
              name="visitRangeHigh"
              placeholder="To:"
              value={input.visitRangeHigh}
              onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            />
          </Form.Group>
          <Form.Group >
            <Button
              active={selected === 'all'}
              className="btn btn-lg btn-block"
              onClick={() => {
                setContent('history');
                setSelected('all');
                setQuery(`&visitRangeHigh=${input.visitRangeHigh}&visitRangeLow=${input.visitRangeLow || '1900-01-01'}`);
              }}
            >
              All visits
            </Button>
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
