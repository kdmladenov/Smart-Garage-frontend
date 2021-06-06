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

const VisitCardDetailed = ({
  visitId,
  carSegment,
  editMode,
  setEditMode,
  allCurrencies,
  registerVisitMode,
  setRegisterVisitMode,
  visits
}) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('false');
  const [visit, setVisit] = useState({});
  const [visitCopy, setVisitCopy] = useState({});

  // console.log(loading, 'loading vcd');
  // console.log(registerVisitMode, 'registerVisitMode vcd');
  // console.log(visits, 'visits vcd');
  console.log(JSON.stringify(visit), 'visit vcd');

  useEffect(() => {
    setLoading(true);
    if (visitId) {
      fetch(`${BASE_URL}/visits/${visitId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getToken()}`
        }
      })
        .then((res) => res.json())
        .then((res) => {
          setVisit(res);
          setVisitCopy({
            ...res,
            usedParts: res.usedParts.map((p) => ({ ...p })),
            performedServices: res.performedServices.map((s) => ({ ...s }))
          });
        })
        .catch((e) => setError(e.message))
        .finally(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    if (registerVisitMode) {
      setVisit(visits);
      setVisitCopy({
        ...visits,
        usedParts: visits.usedParts.map((p) => ({ ...p })),
        performedServices: visits.performedServices.map((s) => ({ ...s }))
      });
    };
    setLoading(false);
  }, [registerVisitMode]);

  const [inputErrors, setInputErrors] = useState({
    notes: '',
    visitStatus: ''
  });

  const {
    data: services
    // setLocalData: setServices
  } = useHttp(`${BASE_URL}/services?carSegment=${carSegment}`, 'GET', []);

  const {
    data: parts
    // setLocalData: setParts
  } = useHttp(`${BASE_URL}/parts?carSegment=${carSegment}`, 'GET', []);

  const [service, setService] = useState({ serviceId: 0, name: 'Select Service', serviceQty: 0 });
  const [part, setPart] = useState({ partId: 0, name: 'Select Part', partQty: 0 });

  const [currency, setCurrency] = useState({ id: 'BGN', rate: 1 });

  if (loading) {
    return <Loading />;
  }

  console.log(service, 'service');
  const updateVisit = (prop, value) => setVisit({ ...visit, [prop]: value });

  const handleInput = (prop, value) => {
    setInputErrors({ ...inputErrors, [prop]: validateInput[prop](value) });
    updateVisit(prop, value);
  };

  const changeCurrency = (curr) => {
    fetch(`${CURRENCY_URL}/api/v7/convert?compact=ultra&q=BGN_${curr}&apiKey=${CURRENCY_API_KEY}`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        console.log(res[`BGN_${curr}`]);
        setCurrency({ id: curr, rate: res[`BGN_${curr}`] });
      })
      .catch((e) => {
        setError('Currency converter is currently unavailable. Please try again later.');
      });
  };

  const addService = (serviceId, qty) => {
    const newService = { ...services.find((s) => s.serviceId === +serviceId), serviceQty: qty };
    setVisit({ ...visit, performedServices: [newService, ...visit.performedServices] });
  };
  const addPart = (partId, qty) => {
    const newPart = { ...parts.find((p) => p.partId === +partId), partQty: qty };
    setVisit({ ...visit, usedParts: [newPart, ...visit.usedParts] });
  };

  const updatePerformedServiceQty = (serviceId, serviceQty) => {
    const updatedServices = visit.performedServices.map((s) => {
      if (s.serviceId === serviceId) {
        return { ...s, serviceQty: serviceQty };
      } else {
        return { ...s };
      }
    });

    setVisit({ ...visit, performedServices: updatedServices });
  };

  const updateUsedPartsQty = (partId, partQty) => {
    const updatedParts = visit.usedParts.map((p) => {
      if (p.partId === partId) {
        return { ...p, partQty: partQty };
      } else {
        return { ...p };
      }
    });

    setVisit({ ...visit, usedParts: updatedParts });
  };
  const isValid = registerVisitMode
    ? Object.values(inputErrors).every((v) => v === '') &&
      Object.values(visit).every((v) => v !== '')
    : Object.values(inputErrors).every((v) => v === '');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError('');
    console.log(visit);
    if (registerVisitMode && isValid) {
      fetch(`${BASE_URL}/visits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(visit)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            console.log(res.message);
            setError(res.message);
          } else {
            setVisitCopy({
              ...visit,
              usedParts: visit.usedParts.map((p) => ({ ...p })),
              performedServices: visit.performedServices.map((s) => ({ ...s }))
            });
          }
        });
    };

    if (editMode && isValid) {
      fetch(`${BASE_URL}/visits/${visit.visitId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(visit)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            console.log(res.message);
            setError(res.message);
          } else {
            setVisitCopy({
              ...visit,
              usedParts: visit.usedParts.map((p) => ({ ...p })),
              performedServices: visit.performedServices.map((s) => ({ ...s }))
            });
            setEditMode(false);
          }
        });
    }
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
          {(editMode || registerVisitMode) && (
            <>
              <MDBBtn type="submit" onClick={handleFormSubmit} disabled={!isValid}>
                <MDBIcon icon="check" />
              </MDBBtn>
              <MDBBtn
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setVisit({
                    ...visitCopy,
                    usedParts: visitCopy.usedParts.map((p) => ({ ...p })),
                    performedServices: visitCopy.performedServices.map((s) => ({ ...s }))
                  });
                  setCurrency({ id: 'BGN', rate: 1 });
                  setInputErrors({
                    notes: '',
                    visitStatus: '',
                    performedServices: '',
                    usedParts: ''
                  });
                  setError('');
                }}
              >
                <MDBIcon icon="times" />
              </MDBBtn>
            </>
          )}
          {!editMode && !registerVisitMode && (
            <MDBBtn
              type="button"
              onClick={() => {
                setEditMode(true);
              }}
            >
              <MDBIcon icon="edit" />
            </MDBBtn>
          )}
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
          <Form.Group controlId="formBasicNotes" className={inputErrors.notes ? 'error' : ''}>
            <Form.Control
              type="text"
              name="notes"
              placeholder="Enter Notes"
              value={visit.notes}
              onChange={(e) => handleInput(e.target.name, e.target.value)}
              disabled={!editMode && !registerVisitMode}
            />
            <Form.Label>{`Notes${inputErrors.notes}`}</Form.Label>
          </Form.Group>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
          <Form.Group controlId="formBasicStatus" className={inputErrors.visitStatus ? 'error' : ''}>
            <Form.Control
              as="select"
              name="visitStatus"
              value={visit.visitStatus}
              onChange={(e) => handleInput(e.target.name, e.target.value)}
              disabled={!editMode && !registerVisitMode}
            >
              <option value="">Select Status</option>
              {Object.values(visitStatusEnum).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Form.Control>
            <Form.Label>{`Status${inputErrors.visitStatus}`}</Form.Label>
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
              {allCurrencies.map((curr) => (
                <option key={curr} value={curr}>
                  {curr}
                </option>
              ))}
            </Form.Control>
            <Form.Label>{'Currency'}</Form.Label>
          </Form.Group>
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="performed-services">
            <span>Performed Services</span>
            {(editMode || registerVisitMode) && (
              <span className="select-service">
                <Form.Group controlId="formBasicSelectService">
                  <Form.Control
                    as="select"
                    name="service"
                    value={service.serviceId}
                    onChange={(e) =>
                      setService({
                        serviceId: e.target.value,
                        name: services.find(({ serviceId }) => serviceId === +e.target.value).name
                      })
                    }
                  >
                    <option value={0}>Select Service</option>
                    {services.map((s) => (
                      <option key={s.serviceId} value={s.serviceId}>
                        {s.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicServiceQty">
                  <Form.Control
                    style={{ width: '50px' }}
                    type="number"
                    name="serviceQty"
                    value={service.serviceQty}
                    min="1"
                    onChange={(e) => setService({ ...service, serviceQty: e.target.value })}
                  />
                </Form.Group>
                <MDBBtn
                  onClick={() => addService(service.serviceId, service.serviceQty)}
                  disabled={service && (service.name === 'Select Service')}
                >
                  <MDBIcon icon="plus-square" />
                </MDBBtn>
              </span>
            )}
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
              {visit &&
                visit.performedServices &&
                visit.performedServices.map((s) => (
                  <TableRow
                    key={s.serviceId}
                    id={s.serviceId}
                    name={s.name}
                    quantity={+s.serviceQty}
                    price={s.price}
                    carSegment={carSegment}
                    editMode={editMode || registerVisitMode}
                    updateQty={updatePerformedServiceQty}
                    currency={currency}
                  />
                ))}
            </MDBTableBody>
          </MDBTable>
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="performed-services">
            <span>Used Parts</span>
            {(editMode || registerVisitMode) && (
              <span className="select-service">
                <Form.Group controlId="formBasicSelectPart">
                  <Form.Control
                    as="select"
                    name="part"
                    value={part.partId}
                    onChange={(e) =>
                      setPart({
                        partId: e.target.value,
                        name: parts.find(({ partId }) => partId === +e.target.value).name
                      })
                    }
                  >
                    <option value={0}>Select Part</option>
                    {parts.map((p) => (
                      <option key={p.partId} value={p.partId}>
                        {p.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formBasicPartQty">
                  <Form.Control
                    style={{ width: '50px' }}
                    type="number"
                    name="partQty"
                    value={part.partQty}
                    min="1"
                    onChange={(e) => setPart({ ...part, partQty: e.target.value })}
                  />
                </Form.Group>
                <MDBBtn
                  onClick={() => addPart(part.partId, part.partQty)}
                  disabled={part && (part.name === 'Select Part')}
                >
                  <MDBIcon icon="plus-square" />
                </MDBBtn>
              </span>
            )}
          </div>
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th>setParts ID</th>
                <th>Car Segment</th>
                <th>Name</th>
                <th style={{ textAlign: 'center' }}>Qty</th>
                <th>Unit Price</th>
                <th>Amount</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {visit &&
                visit.usedParts &&
                visit.usedParts.map((p) => (
                  <TableRow
                    key={p.partId}
                    id={+p.partId}
                    name={p.name}
                    quantity={+p.partQty}
                    price={+p.price}
                    carSegment={carSegment}
                    editMode={editMode || registerVisitMode}
                    updateQty={updateUsedPartsQty}
                    currency={currency}
                  />
                ))}
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
  visitEnd: '',
  visitId: null,
  carSegment: '',
  carSegmentId: '',
  fullName: null,
  email: '',
  engineType: '',
  licensePlate: '',
  manufacturer: '',
  manufacturedYear: null,
  manufacturerId: null,
  modelName: '',
  modelId: null,
  transmission: '',
  userId: null,
  vehicleId: null,
  vin: '',
  city: '',
  country: '',
  notes: '',
  performedServices: [],
  phone: '',
  visitStatus: '',
  usedParts: [],
  visitStart: '',
  addressId: 0,
  editMode: false,
  setEditMode: () => {},
  allCurrencies: [],
  setRegisterVisitMode: () => {},
  registerVisitMode: false
};

VisitCardDetailed.propTypes = {
  visits: PropTypes.shape({
    carSegment: PropTypes.string,
    city: PropTypes.string,
    companyName: PropTypes.string,
    country: PropTypes.string,
    email: PropTypes.string,
    engineType: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    licensePlate: PropTypes.string,
    manufacturedYear: PropTypes.number,
    manufacturerId: PropTypes.number,
    manufacturer: PropTypes.string,
    modelId: PropTypes.number,
    modelName: PropTypes.string,
    notes: PropTypes.string,
    performedServices: PropTypes.array,
    phone: PropTypes.string,
    visitStatus: PropTypes.string,
    streetAddress: PropTypes.string,
    transmission: PropTypes.string,
    usedParts: PropTypes.array,
    userId: PropTypes.number,
    vehicleId: PropTypes.number,
    vin: PropTypes.string,
    visitEnd: PropTypes.string,
    visitStart: PropTypes.string,
    addressId: PropTypes.number
  }),
  visitId: PropTypes.number,
  editMode: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func.isRequired,
  allCurrencies: PropTypes.array.isRequired,
  carSegment: PropTypes.string.isRequired,
  setRegisterVisitMode: PropTypes.func,
  registerVisitMode: PropTypes.bool
};

export default VisitCardDetailed;
