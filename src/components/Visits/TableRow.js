import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

const TableRow = ({ id, name, quantity, price, carSegment, editMode, updateQty, currency }) => {
  const [qty, setQty] = useState(quantity);
  const [amount, setAmount] = useState(quantity * price * currency.rate);
  const [unitPrice, setUnitPrice] = useState(price);

  useEffect(() => {
    setAmount(Math.round(qty * price * currency.rate * 100) / 100);
    setUnitPrice(Math.round(price * currency.rate * 100) / 100);
  }, [currency]);

  return (
    <tr>
      <td className="id">{id}</td>
      <td className="car-segment">{carSegment}</td>
      <td className="name">{name}</td>
      <td className="qty">
        <Form.Group style={{ height: 'initial', margin: 'initial', padding: 'initial' }}>
          <Form.Control
            style={{ width: '80px' }}
            type="number"
            name="serviceQty"
            value={qty}
            min="0"
            onChange={(e) => {
              setQty(e.target.value);
              setAmount(Math.round(e.target.value * price * currency.rate * 100) / 100);
              updateQty(id, +e.target.value);
            }}
            disabled={!editMode}
            />
          </Form.Group>
        </td>
      <td className="price">{unitPrice}</td>
      <td className="amount">{amount}</td>
    </tr>
  );
};

TableRow.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  carSegment: PropTypes.string.isRequired,
  editMode: PropTypes.bool.isRequired,
  updateQty: PropTypes.func.isRequired,
  currency: PropTypes.shape({
    id: PropTypes.string.isRequired,
    rate: PropTypes.number.isRequired
  })
};

export default TableRow;