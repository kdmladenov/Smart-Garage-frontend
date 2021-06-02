import PropTypes from 'prop-types';
import { useState } from 'react';
import { Form } from 'react-bootstrap';

const TableRow = ({ service, carSegment, editMode, updateQty }) => {
  const [qty, setQty] = useState(service.serviceQty);
  const [amount, setAmount] = useState(service.serviceQty * service.price);
  return (
    <tr>
      <td>{service.serviceId}</td>
      <td>{carSegment}</td>
      <td>{service.name}</td>
      <td>
        <Form.Group controlId="formBasicQty" style={{ height: 'initial', margin: 'initial', padding: 'initial' }}>
          <Form.Control
            style={{ width: '80px' }}
            type="number"
            name="serviceQty"
            value={qty}
            onChange={(e) => {
              setQty(e.target.value);
              setAmount(service.price * e.target.value);
              updateQty(service.serviceId, +e.target.value);
            }}
            disabled={!editMode}
            />
          </Form.Group>
        </td>
      <td>{service.price}</td>
      <td>{amount}</td>
    </tr>
  );
};

TableRow.propTypes = {
  service: PropTypes.shape({
    serviceId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    serviceQty: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired
  }),
  carSegment: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
  updateQty: PropTypes.func.isRequired
};

export default TableRow;