import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

const TableRow = ({ service, carSegment, editMode, updateQty, currency }) => {
  const [qty, setQty] = useState(service.serviceQty);
  const [amount, setAmount] = useState(service.serviceQty * service.price * currency.rate);
  const [unitPrice, setUnitPrice] = useState(service.price);
  useEffect(() => {
    setAmount(Math.round(service.serviceQty * service.price * currency.rate * 100) / 100);
    setUnitPrice(Math.round(service.price * currency.rate * 100) / 100);
  }, [currency]);
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
              setAmount(Math.round(e.target.value * service.price * currency.rate * 100) / 100);
              updateQty(service.serviceId, +e.target.value);
            }}
            disabled={!editMode}
            />
          </Form.Group>
        </td>
      <td>{unitPrice}</td>
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
  updateQty: PropTypes.func.isRequired,
  currency: PropTypes.shape({
    id: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired
  })
};

export default TableRow;