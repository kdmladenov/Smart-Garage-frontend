import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { MDBBtn, MDBIcon, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { BASE_URL, CURRENCY_API_KEY, CURRENCY_URL } from '../../common/constants';
import { getToken } from '../../providers/AuthContext';
import Loading from '../UI/Loading';
import useHttp from '../../hooks/useHttp';
import TableRow from './TableRow';
import validateInput from './visitValidator';
import visitStatusEnum from '../../common/visit-status.enum';
import './VisitsCardDetailed.css';

const VisitCardDetailed = ({ visitId, carSegment, editMode, setEditMode, allCurrencies }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('false');
  const [visit, setVisit] = useState({});
  const [visitCopy, setVisitCopy] = useState({});
  useEffect(() => {
    setLoading(true);

    fetch(`${BASE_URL}/visits/${visitId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
      .then(res => res.json())
      .then(res => {
        setVisit(res);
        setVisitCopy({ ...res, usedParts: res.usedParts.map(p => ({ ...p })), performedServices: res.performedServices.map(s => ({ ...s })) });
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const [inputErrors, setInputErrors] = useState({
    notes: '',
    status: ''
  });

  const {
    data: services
    // setLocalData: setServices
  } = useHttp(`${BASE_URL}/services?carSegment=${carSegment}`, 'GET', []);

  // const {
  //   data: parts,
  //   // setLocalData: setParts
  // } = useHttp(`${BASE_URL}/parts?carSegment=${carSegment}`, 'GET', []);

  const [service, setService] = useState({ serviceId: 0, name: 'Select Service', serviceQty: 0 });

  const [currency, setCurrency] = useState({ id: 'BGN', rate: 1 });

  if (loading) {
    return <Loading />;
  }

  const updateVisit = (prop, value) => setVisit({ ...visit, [prop]: value });

  const handleInput = (prop, value) => {
    setInputErrors({ ...inputErrors, [prop]: validateInput[prop](value) });
    updateVisit(prop, value);
  };

  const changeCurrency = (curr) => {
    // https://free.currconv.com/api/v7/convert?q=USD_PHP&compact=ultra&apiKey=3999479f12222de128aa
    fetch(`${CURRENCY_URL}/api/v7/convert?compact=ultra&q=BGN_${currency.id}&apiKey=${CURRENCY_API_KEY}`)
      .than(res => res.json())
      .than(res => setCurrency({ id: curr, rate: res[`BGN_${curr}`] }))
      .catch(e => {
        setError('Currency converter is currently unavailable. Please try again later.');
      });
  };

  const addService = (serviceId, qty) => {
    const newService = { ...services.find(s => s.serviceId === +serviceId), serviceQty: qty };
    setVisit({ ...visit, performedServices: [newService, ...visit.performedServices] });
  };

  console.log(visit.performedServices);

  const updatePerformedServiceQty = (serviceId, serviceQty) => {
    const updatedServices = visit.performedServices.map(s => {
      if (s.serviceId === serviceId) {
        return { ...s, serviceQty: serviceQty };
      } else {
        return { ...s };
      }
    });

    setVisit({ ...visit, performedServices: updatedServices });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError('');

    console.log(visit);
    fetch(`${BASE_URL}/visits/${visit.visitId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(visit)
    })
      .then(res => res.json())
      .then(res => {
        if (res.message) {
          console.log(res.message);
          setError(res.message);
        } else {
          setVisitCopy({ ...visit, usedParts: visit.usedParts.map(p => ({ ...p })), performedServices: visit.performedServices.map(s => ({ ...s })) });
          setEditMode(false);
        }
      });
  };

  return (
    <Form className="visit-details">
      <div className="row gutters">
        <div className="col-12 buttons">
          {error && (
            <Form.Group className="error">
              <p>{`${error}`}</p>
            </Form.Group>
          )}
          {editMode && (
            <>
              <MDBBtn type="submit" onClick={handleFormSubmit}>
                <MDBIcon icon="check" />
              </MDBBtn>
              <MDBBtn type="button" onClick={() => {
                setEditMode(false);
                setVisit({ ...visitCopy, usedParts: visitCopy.usedParts.map(p => ({ ...p })), performedServices: visitCopy.performedServices.map(s => ({ ...s })) });
                setInputErrors({
                  notes: '',
                  status: '',
                  performedServices: '',
                  usedParts: ''
                });
                setError('');
              }}>
                <MDBIcon icon="times" />
              </MDBBtn>
            </>
          )}
          {!editMode &&
            <MDBBtn type="button" onClick={() => {
              setEditMode(true);
            }}>
              <MDBIcon icon="edit" />
            </MDBBtn>
          }
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
          <Form.Group controlId="formBasicNotes" className={inputErrors.notes ? 'error' : ''}>
            <Form.Control
              type="text"
              name="notes"
              placeholder="Enter Notes"
              value={visit.notes}
              onChange={(e) => handleInput(e.target.name, e.target.value)}
              disabled={!editMode}
              />
              <Form.Label>
                {`Notes${inputErrors.notes}`}
              </Form.Label>
          </Form.Group>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
          <Form.Group controlId="formBasicStatus" className={inputErrors.status ? 'error' : ''}>
            <Form.Control
              as="select"
              name="status"
              value={visit.status}
              onChange={(e) => handleInput(e.target.name, e.target.value)}
              disabled={!editMode}
              >
                <option value=''>Select Status</option>
                {Object.values(visitStatusEnum).map(s => <option key={s} value={s}>{s}</option>)}
              </Form.Control>
              <Form.Label>
                {`Status${inputErrors.status}`}
              </Form.Label>
          </Form.Group>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
          <Form.Group controlId="formBasicCurrency">
            <Form.Control
              as="select"
              name="currency"
              value={currency.id}
              onChange={(e) => changeCurrency(e.target.value)}
              >
                {allCurrencies.map(curr => <option key={curr} value={curr}>{curr}</option>)}
            </Form.Control>
            <Form.Label>
              {'Currency'}
            </Form.Label>
          </Form.Group>
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="performed-services">
            <span>Performed Services</span>
            {editMode &&
            <span className="select-service">
              <Form.Group controlId="formBasicSelectService">
                <Form.Control
                  as="select"
                  name="service"
                  value={service.serviceId}
                  onChange={(e) => setService({ serviceId: e.target.value, name: services.find(({ serviceId }) => serviceId === +e.target.value).name })}
                  >
                    <option value={0} >Select Service</option>
                    {services.map(s => <option key={s.serviceId} value={s.serviceId}>{s.name}</option>)}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formBasicServiceQty">
                <Form.Control
                  style={{ width: '50px' }}
                  type="number"
                  name="serviceQty"
                  value={service.serviceQty}
                  onChange={(e) => setService({ ...service, serviceQty: e.target.value })}
                />
              </Form.Group>
              <MDBBtn onClick={() => addService(service.serviceId, service.serviceQty)}>
                <MDBIcon icon="plus-square" />
              </MDBBtn>
            </span>}
          </div>
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th>service ID</th>
              <th>Car Segment</th>
              <th>Name</th>
              <th style={{ textAlign: 'center' }}>Qty</th>
              <th>Unit Price</th>
              <th>Amount</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {visit.performedServices.map(s => (
              <TableRow
                key={s.serviceId}
                service={s}
                carSegment={carSegment}
                editMode={editMode}
                updateQty={updatePerformedServiceQty}
              />)
            )}
          </MDBTableBody>
        </MDBTable>
        </div>
      </div>
    </Form>
  );
};

VisitCardDetailed.defaultProps = {
  streetAddress: '',
  firstName: '',
  lastName: '',
  companyName: '',
  visitEnd: ''
};

VisitCardDetailed.propTypes = {
  // visit: PropTypes.shape({
  //   addressId: PropTypes.number.isRequired,
  //   visitId: PropTypes.number.isRequired,
  //   carSegment: PropTypes.number.isRequired,
  //   city: PropTypes.string.isRequired,
  //   companyName: PropTypes.string,
  //   country: PropTypes.string.isRequired,
  //   email: PropTypes.string.isRequired,
  //   engineType: PropTypes.string.isRequired,
  //   firstName: PropTypes.string,
  //   lastName: PropTypes.string,
  //   licensePlate: PropTypes.string.isRequired,
  //   manufacturedYear: PropTypes.number.isRequired,
  //   manufacturerId: PropTypes.number.isRequired,
  //   manufacturerName: PropTypes.string.isRequired,
  //   modelId: PropTypes.number.isRequired,
  //   modelName: PropTypes.string.isRequired,
  //   notes: PropTypes.string.isRequired,
  //   phone: PropTypes.string.isRequired,
  //   status: PropTypes.string.isRequired,
  //   streetAddress: PropTypes.string,
  //   transmission: PropTypes.string.isRequired,
  //   userId: PropTypes.number.isRequired,
  //   vehicleId: PropTypes.number.isRequired,
  //   vin: PropTypes.string.isRequired,
  //   visitEnd: PropTypes.string,
  //   visitStart: PropTypes.string.isRequired
  // }).isRequired,
  visitId: PropTypes.number.isRequired,
  editMode: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func.isRequired,
  allCurrencies: PropTypes.array.isRequired,
  carSegment: PropTypes.string.isRequired
};

export default VisitCardDetailed;
