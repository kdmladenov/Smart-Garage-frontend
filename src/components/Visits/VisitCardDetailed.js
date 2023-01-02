import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';
import { MDBBtn, MDBIcon, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { BASE_URL, CURRENCY_API_KEY, CURRENCY_URL, emptyVisit } from '../../common/constants';
import { getToken, getUser } from '../../providers/AuthContext';
import Loading from '../UI/Loading';
import useHttp from '../../hooks/useHttp';
import TableRow from './TableRow';
import validateInput from './visitValidator';
import validatePart from '../Parts/partValidator';
import visitStatusEnum from '../../common/visit-status.enum';
import './VisitsCardDetailed.css';
import validateService from '../Services/serviceValidator';

const VisitCardDetailed = ({
  visitId,
  carSegment,
  editMode,
  setEditMode,
  allCurrencies,
  registerVisitMode,
  setRegisterVisitMode,
  newVisit,
  newVehicle,
  setRegisterVehicleMode,
  setRegisterCustomerMode,
  setCreated,
  setVisitCardHeader
}) => {
  const [error, setError] = useState('');
  const [visit, setVisit] = useState(emptyVisit);
  const [loading, setLoading] = useState('false');
  const [visitCopy, setVisitCopy] = useState(emptyVisit);
  const [serviceCreated, setServiceCreated] = useState({ name: '', price: 0, carSegment: carSegment, serviceQty: 0 });
  const [partCreated, setPartCreated] = useState({ name: '', price: 0, carSegment: carSegment, partQty: 0 });
  const [inputErrorsServices, setInputErrorsServices] = useState({ name: '', price: '', carSegment: '' });
  const [inputErrorsParts, setInputErrorsParts] = useState({ name: '', price: '', carSegment: '' });
  const [totals, setTotals] = useState({
    totalServices: 0,
    totalParts: 0,
    tax: 0,
    total: 0
  });
  const [inputErrors, setInputErrors] = useState({
    notes: '',
    visitStatus: ''
  });

  const { data: services } = useHttp(`${BASE_URL}/services?carSegment=${carSegment}`, 'GET', []);
  const { data: parts } = useHttp(`${BASE_URL}/parts?carSegment=${carSegment}`, 'GET', []);
  const [service, setService] = useState({ serviceId: 0, name: 'Select Service', serviceQty: 0 });
  const [part, setPart] = useState({ partId: 0, name: 'Select Part', partQty: 0 });
  const [currency, setCurrency] = useState({ id: 'BGN', rate: 1 });

  const updateVisit = (prop, value) => setVisit({ ...visit, [prop]: value });
  const handleInput = (prop, value) => {
    setInputErrors({ ...inputErrors, [prop]: validateInput[prop](value) });
    updateVisit(prop, value);
  };
  useEffect(() => {
    let isMounted = true;
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
          if (isMounted) {
            setVisit(res);
            setVisitCopy({
              ...res,
              usedParts: res.usedParts.map((p) => ({ ...p })),
              performedServices: res.performedServices.map((s) => ({ ...s }))
            });
          }
        })
        .catch((e) => {
          if (isMounted) {
            setError(e.message);
          }
        })
        .finally(() => {
          if (isMounted) {
            setLoading(false);
          }
        });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    if (registerVisitMode && newVehicle) {
      setVisit({ ...newVisit, vehicleId: newVehicle.vehicleId });
    }
    if (registerVisitMode && !newVehicle) {
      setVisit({ ...newVisit });
    }
    setLoading(false);
  }, [registerVisitMode, newVehicle]);

  const changeCurrency = (curr) => {
    fetch(`${CURRENCY_URL}/api/v7/convert?compact=ultra&q=BGN_${curr}&apiKey=${CURRENCY_API_KEY}`)
      .then((res) => res.json())
      .then((res) => {
        setCurrency({ id: curr, rate: res[`BGN_${curr}`] });
      })
      .catch((e) => {
        setError('Currency converter is currently unavailable. Please try again later.');
      });
  };

  const addService = (serviceId, qty) => {
    if (visit.performedServices.some(s => s.serviceId === +serviceId)) {
      setError('You have already selected this service, please increase the quantity.');
    } else {
      const newService = { ...services.find((s) => s.serviceId === +serviceId), serviceQty: qty };
      setVisit({ ...visit, performedServices: [newService, ...visit.performedServices] });
    }
  };

  const addPart = (partId, qty) => {
    if (visit.usedParts.some(p => p.partId === +partId)) {
      setError('You have already selected this part, please increase the quantity.');
    } else {
      const newPart = { ...parts.find((p) => p.partId === +partId), partQty: qty };
      setVisit({ ...visit, usedParts: [newPart, ...visit.usedParts] });
    }
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

  const handleInputPartsServices = (prop, value, resource) => {
    if (resource === 'services') {
      setInputErrorsServices({
        ...inputErrorsServices,
        [prop]: validateService[prop](value)
      });
      updateService(prop, value);
    }
    if (resource === 'parts') {
      setInputErrorsParts({
        ...inputErrorsParts,
        [prop]: validatePart[prop](value)
      });
      updatePart(prop, value);
    }
  };

  const updateService = (prop, value) => setServiceCreated({ ...serviceCreated, [prop]: value });

  const updatePart = (prop, value) => setPartCreated({ ...partCreated, [prop]: value });

  const isValidService =
  Object.values(inputErrorsServices).every((v) => !v) && Object.values({ ...serviceCreated, carSegment }).every((v) => v);

  const isValidPart =
    Object.values(inputErrorsParts).every((v) => !v) &&
    Object.values({ ...partCreated, carSegment }).every((v) => v);

  const handleFormSubmitServices = (e) => {
    e.preventDefault();
    setError('');
    if (isValidService) {
      fetch(`${BASE_URL}/services`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({ ...serviceCreated, carSegment })
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            setError('You have already selected this part, please increase the quantity.');
          } else {
            setVisit({
              ...visit,
              performedServices: [{ ...serviceCreated, serviceId: res.serviceId, carSegment }, ...visit.performedServices]
            });
          }

          setServiceCreated({ name: '', price: 0, carSegment: carSegment });
          // setCreateServiceMode(false);
        });
    }
  };

  const handleFormSubmitParts = (e) => {
    e.preventDefault();
    setError('');
    if (isValidPart) {
      fetch(`${BASE_URL}/parts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({ ...partCreated, carSegment })
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            setError('You have already selected this part, please increase the quantity.');
          } else {
            setVisit({
              ...visit,
              usedParts: [{ ...partCreated, partId: res.partId, carSegment }, ...visit.usedParts]
            });
          }
          setPartCreated({ name: '', price: 0, carSegment: carSegment });
          // setCreateMode(false);
        });
    }
  };
  const sumTotalServices = (arr) => arr?.reduce((acc, item) => (acc += Math.round(item.serviceQty * item.price * currency.rate * 100) / 100), 0);
  const sumTotalParts = (arr) => arr?.reduce((acc, item) => (acc += Math.round(item.partQty * item.price * currency.rate * 100) / 100), 0);

  useEffect(() => {
    setTotals({
      totalServices: sumTotalServices(visit.performedServices)?.toFixed(2),
      totalParts: sumTotalParts(visit.usedParts)?.toFixed(2),
      tax: (Math.round((sumTotalServices(visit.performedServices) + sumTotalParts(visit.usedParts)) * 0.2 * 100) / 100)?.toFixed(2),
      total: (Math.round((sumTotalServices(visit.performedServices) + sumTotalParts(visit.usedParts)) * 1.2 * 100) / 100)?.toFixed(2)
    });
  }, [currency, visit.performedServices, visit.usedParts]);

  const isValid = registerVisitMode
    ? Object.values(inputErrors).every((v) => v === '') &&
      visit.notes &&
      visit.vehicleId &&
      Array.isArray(visit.performedServices) &&
      Array.isArray(visit.usedParts)
    : Object.values(inputErrors).every((v) => v === '');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (registerVisitMode && isValid) {
      fetch(`${BASE_URL}/visits`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify({ ...visit, carSegment })
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            setError(res.message);
          } else {
            setRegisterVisitMode(false);
            setRegisterVehicleMode(false);
            setRegisterCustomerMode(false);
            setCreated(true);
            setVisitCardHeader({
              notes: res.notes,
              visitStatus: res.visitStatus,
              visitStart: res.visitStart,
              visitEnd: res.visitEnd
            });
          }
        });
    }

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
            setError(res.message);
          } else {
            setVisitCopy({
              ...visit,
              usedParts: visit.usedParts.map((p) => ({ ...p })),
              performedServices: visit.performedServices.map((s) => ({ ...s }))
            });
            setVisitCardHeader({
              notes: visit.notes,
              visitStatus: visit.visitStatus,
              visitStart: visit.visitStart,
              visitEnd: visit.visitEnd
            });
            setEditMode(false);
          }
        });
    }
  };

  if (loading) {
    return <Loading />;
  }

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
              <MDBBtn type="submit" onClick={handleFormSubmit} disabled={!isValid} style={{ backgroundColor: 'transparent' }}>
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
          {getUser().role === 'employee' && !editMode && !registerVisitMode && (
            <MDBBtn type="button" onClick={() => setEditMode(true)}>
              <MDBIcon icon="edit" />
            </MDBBtn>
          )}
        </div>
        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
          <Form.Group className={inputErrors.notes ? 'error notes' : 'notes'}>
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
          <Form.Group className={inputErrors.visitStatus ? 'error status' : 'status'}>
            <Form.Control
              as="select"
              name="visitStatus"
              value={visit.visitStatus}
              onChange={(e) => handleInput(e.target.name, e.target.value)}
              disabled={!editMode && !registerVisitMode}
            >
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
          <Form.Group>
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
                <Form.Group className="select-service-drop-down">
                  <Form.Control
                    className="service name"
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
                    <option value={0}>{service.name}</option>
                    {services.map((s) => (
                      <option key={s.serviceId} value={s.serviceId}>
                        {s.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    style={{ width: '50px' }}
                    type="number"
                    name="serviceQty"
                    value={service.serviceQty}
                    min="1"
                    onChange={(e) => setService({ ...service, serviceQty: +e.target.value })}
                  />
                </Form.Group>
                <MDBBtn
                  onClick={() => {
                    addService(service.serviceId, service.serviceQty);
                    setService({ serviceId: 0, name: 'Select Service', serviceQty: 0 });
                  }}
                  disabled={service && (service.name === 'Select Service' || !(service.serviceQty > 0))}
                >
                  <MDBIcon icon="plus-square" />
                </MDBBtn>
              </span>
            )}
          </div>
        </div>
        {(editMode || registerVisitMode) && (
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="performed-services-create">
              <span className="select-service">
                <Form.Group className={inputErrorsServices.price ? 'error' : ''}>
                  <Form.Control
                    style={{ width: '100px' }}
                    type="text"
                    name="price"
                    placeholder="Enter Service Price"
                    value={serviceCreated.price}
                    onChange={(e) => handleInputPartsServices(e.target.name, +e.target.value, 'services')}
                  />
                  <Form.Label className="visible">{`Price${inputErrorsServices.price} `}</Form.Label>
                </Form.Group>
                  <Form.Group className={inputErrorsServices.name ? 'error' : ''}>
                    <Form.Control
                      className="service name"
                      type="text"
                      name="name"
                      placeholder="Enter Service Name"
                      value={serviceCreated.name || ''}
                      onChange={(e) => {
                        handleInputPartsServices(e.target.name, e.target.value, 'services');
                      }}
                    />
                    <Form.Label className="visible">{`Name${inputErrorsServices.name}`}</Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      style={{ width: '50px' }}
                      type="number"
                      name="serviceQty"
                      value={serviceCreated.serviceQty}
                      min="1"
                      onChange={(e) => setServiceCreated({ ...serviceCreated, serviceQty: +e.target.value })}
                    />
                    <Form.Label className="visible">Qty</Form.Label>
                  </Form.Group>
                  <MDBBtn type="submit" onClick={handleFormSubmitServices} disabled={!isValidService}>
                    <MDBIcon icon="plus-square" />
                  </MDBBtn>
              </span>
            </div>
          </div>
        )}
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th>ID</th>
                <th>Car Segment</th>
                <th>Name</th>
                <th style={{ textAlign: 'center' }}>Qty</th>
                <th>Unit Price</th>
                <th>Amount</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {visit?.performedServices?.map((s) => (
                <TableRow
                  key={s.serviceId}
                  id={s.serviceId}
                  name={s.name}
                  quantity={s.serviceQty || 1}
                  price={s.price}
                  carSegment={carSegment}
                  editMode={editMode || registerVisitMode}
                  updateQty={updatePerformedServiceQty}
                  currency={currency}
                />
              ))}
              <tr>
                <td className="id"></td>
                <td className="car-segment"></td>
                <td className="name"></td>
                <td colSpan="2" className="subtotal price">Total Services</td>
                <td className="amount">{totals.totalServices}</td>
              </tr>
            </MDBTableBody>
          </MDBTable>
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="performed-services">
            <span>Used Parts</span>
            {(editMode || registerVisitMode) && (
              <span className="select-service">
                <Form.Group>
                  <Form.Control
                    className="part name"
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
                <Form.Group>
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
                  onClick={() => {
                    addPart(part.partId, part.partQty);
                    setPart({ partId: 0, name: 'Select Part', partQty: 0 });
                  }}
                  disabled={part && (part.name === 'Select Part' || !(part.partQty > 0))}
                >
                  <MDBIcon icon="plus-square" />
                </MDBBtn>
              </span>
            )}
          </div>
        </div>
        {(editMode || registerVisitMode) && (
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="performed-services-create">
              <span className="select-service">
                  <Form.Group className={inputErrorsParts.price ? 'error' : ''}>
                    <Form.Control
                      style={{ width: '100px' }}
                      type="text"
                      name="price"
                      placeholder="Enter Part Price"
                      value={partCreated.price}
                      onChange={(e) => handleInputPartsServices(e.target.name, +e.target.value, 'parts')}
                    />
                    <Form.Label className="visible">{`Price${inputErrorsParts.price} `}</Form.Label>
                  </Form.Group>
                  <Form.Group className={inputErrorsParts.name ? 'error' : ''}>
                    <Form.Control
                      className="part name"
                      type="text"
                      name="name"
                      placeholder="Enter Part Name"
                      value={partCreated.name || ''}
                      onChange={(e) => {
                        handleInputPartsServices(e.target.name, e.target.value, 'parts');
                      }}
                    />
                    <Form.Label className="visible">{`Name${inputErrorsParts.name}`}</Form.Label>
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      style={{ width: '50px' }}
                      type="number"
                      name="partQty"
                      value={partCreated.partQty}
                      min="1"
                      onChange={(e) => setPartCreated({ ...partCreated, partQty: +e.target.value })}
                    />
                    <Form.Label className="visible">Qty</Form.Label>
                  </Form.Group>
                  <MDBBtn type="submit" onClick={handleFormSubmitParts} disabled={!isValidPart}>
                    <MDBIcon icon="plus-square" />
                  </MDBBtn>
              </span>
            </div>
          </div>
        )}
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th className="id">ID</th>
                <th className="car-segment">Car Segment</th>
                <th className="name">Name</th>
                <th className="qty" style={{ textAlign: 'center' }}>Qty</th>
                <th className="price">Unit Price</th>
                <th className="amount">Amount</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {visit?.usedParts?.map((p) => (
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
              <tr>
                <td className="id"></td>
                <td className="car-segment"></td>
                <td className="name"></td>
                <td colSpan="2" className="subtotal price">Total Parts</td>
                <td className="amount">{totals.totalParts}</td>
              </tr>
              <tr>
                <td className="id"></td>
                <td className="car-segment"></td>
                <td className="name"></td>
                <td className="price"></td>
                <td className="tax price">Total Tax</td>
                <td className="tax amount">{totals.tax}</td>
              </tr>
              <tr>
                <td></td>
                <td className="car-segment"></td>
                <td className="name"></td>
                <td className="price"></td>
                <td className="total price">TOTAL</td>
                <td className="total amount">{totals.total}</td>
              </tr>
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
  registerVisitMode: false,
  setCreated: () => {},
  setRegisterVehicleMode: () => {},
  setRegisterCustomerMode: () => {},
  setVisitCardHeader: () => {}
};

VisitCardDetailed.propTypes = {
  newVisit: PropTypes.shape({
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
  editMode: PropTypes.bool,
  setEditMode: PropTypes.func,
  allCurrencies: PropTypes.array.isRequired,
  carSegment: PropTypes.string.isRequired,
  setRegisterVisitMode: PropTypes.func,
  registerVisitMode: PropTypes.bool,
  setRegisterVehicleMode: PropTypes.func,
  newVehicle: PropTypes.shape({
    carSegment: PropTypes.string,
    manufacturer: PropTypes.string,
    vehicleId: PropTypes.number,
    modelId: PropTypes.number,
    engineType: PropTypes.string,
    manufacturedYear: PropTypes.number,
    userId: PropTypes.number,
    licensePlate: PropTypes.string,
    vin: PropTypes.string
  }),
  setCreated: PropTypes.func,
  setRegisterCustomerMode: PropTypes.func,
  setVisitCardHeader: PropTypes.func
};

export default VisitCardDetailed;
