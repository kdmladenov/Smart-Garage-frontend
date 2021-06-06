import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import CustomToggle from '../UI/Accordion/CustomToggle';
import CustomerCardDetailed from './CustomerCardDetailed';
import VehicleCard from '../Vehicles.js/VehicleCard';
import VisitCardDetailed from '../Visits/VisitCardDetailed';
// import { useLocation } from 'react-router';
import useHttp from '../../hooks/useHttp';
import { BASE_URL, emptyVisit, emptyVehicle } from '../../common/constants';
// import Loading from '../UI/Loading';
import './Customers.css';
import DeleteButtonWithPopover from '../UI/DeleteButtonWithPopover/DeleteButtonWithPopover';
import { getToken } from '../../providers/AuthContext';
import VehicleCardDetailed from '../Vehicles.js/VehicleCardDetailed';

const CustomerCard = ({ customer, registerCustomerMode, setRegisterCustomerMode, allCurrencies, setCreated }) => {
  const [editMode, setEditMode] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [registerVehicleMode, setRegisterVehicleMode] = useState(false);
  const [registerVisitMode, setRegisterVisitMode] = useState(false);
  const [newCustomerId, setNewCustomerId] = useState(customer.userId);
  const [newVehicle, setNewVehicle] = useState({});
  // const [error, setError] = useState('');
  // const { search: query } = useLocation();
  const {
    data,
    setData
    // loading
    // error
  } = useHttp(`${BASE_URL}/vehicles?userId=${customer.userId}`, 'GET', []);
  console.log(newVehicle, 'newVehicle cc');

  // useEffect(() => {
  //   // setLoading(true);
  //   if (registerVehicleMode) {
  //     setNewVehicle(data[data.length - 1]);
  //   }
  //   // setLoading(false);
  // }, [registerVisitMode, data]);
  // if (loading) {
  //   return <Loading />;
  // }
  // // if (error === '404') {
  // //   history.push('*');
  // // } else if (error) {
  // //   history.push('/serviceUnavailable');
  // // }

  const handleDeleteButton = () => {
    fetch(`${BASE_URL}/users/${customer.userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.error) {
          throw new Error(result.message);
        }
        setIsDeleted(!isDeleted);
      });
    // .catch((e) => setError(e.message));
  };

  // const emptyVehicle = {
  //   userId: customer.userId || newCustomerId,
  //   vin: '',
  //   licensePlate: '',
  //   engineType: '',
  //   transmission: '',
  //   manufacturedYear: '',
  //   modelName: '',
  //   manufacturer: '',
  //   carSegment: ''
  // };

  // const emptyVisit = {
  //   carSegment: '',
  //   city: '',
  //   companyName: '',
  //   country: '',
  //   email: '',
  //   engineType: '',
  //   firstName: '',
  //   lastName: '',
  //   licensePlate: '',
  //   manufacturedYear: 0,
  //   manufacturerId: 0,
  //   manufacturer: '',
  //   modelId: 0,
  //   modelName: '',
  //   notes: '',
  //   performedServices: [],
  //   phone: '',
  //   visitStatus: '',
  //   streetAddress: '',
  //   transmission: '',
  //   usedParts: [],
  //   userId: customer.userId,
  //   vehicleId: 0,
  //   vin: '',
  //   visitEnd: '',
  //   visitStart: '',
  //   addressId: 0
  // };
  // `{${customer.userId}` || `${newCustomerId}}`
  // useEffect(() => {
  //   emptyVehicle.userId = customer.userId || newCustomerId;
  // }, [customer, newCustomerId]);

  const vehiclesListToShow = (
    <div className="vehicle-list">
      {data.map((vehicle) => {
        return (
          <VehicleCard
            key={vehicle.vehicleId}
            vehicle={vehicle}
            registerVehicleMode={registerVehicleMode}
            setRegisterVehicleMode={setRegisterVehicleMode}
            allCurrencies={allCurrencies}
            registerVisitMode={registerVisitMode}
            setRegisterVisitMode={setRegisterVisitMode}
            newVisit={{ ...emptyVisit, ...vehicle, ...customer }}
            setCreated={setCreated}
          />
        );
      })}
    </div>
  );

  if (registerCustomerMode) {
    return (
      // <Card>
      //   <Card.Header className="card-header">
      //     <div className="register-header card-header-text">Register New Customer</div>
      //   </Card.Header>
      //   <Card.Body>
      //     <CustomerCardDetailed
      //       // key={customer.userId}
      //       customer={customer}
      //       editMode={editMode}
      //       setEditMode={setEditMode}
      //       registerCustomerMode={registerCustomerMode}
      //       setRegisterCustomerMode={setRegisterCustomerMode}
      //       newCustomerId={newCustomerId}
      //       setNewCustomerId={setNewCustomerId}
      //     />
      //   </Card.Body>
      //   <Card.Header className="card-header">
      //     <div className="register-header card-header-text">Register New Vehicle</div>
      //   </Card.Header>
      //   <Card.Body>
      //     <VehicleCard
      //       // key={vehicle.vehicleId}
      //       vehicle={{ ...emptyVehicle, userId: customer.userId || newCustomerId }}
      //       registerVehicleMode={registerVehicleMode}
      //       setRegisterVehicleMode={setRegisterVehicleMode}
      //       registerCustomerMode={registerCustomerMode}
      //       setRegisterCustomerMode={setRegisterCustomerMode}
      //       newCustomerId={newCustomerId || customer.userId}
      //       setVehicleList={setData}
      //       vehicleList={data}
      //     />
      //   </Card.Body>
      // </Card>
      <>
        <Accordion>
          <Card key={customer.userId}>
            <Card.Header className="card-header">
              <div className="card-header-text customer-name">Customer</div>
              <div className="card-header-buttons"></div>
            </Card.Header>
            <Card.Body>
              <CustomerCardDetailed
                customer={customer}
                editMode={editMode}
                setEditMode={setEditMode}
                registerCustomerMode={registerCustomerMode}
                setRegisterCustomerMode={setRegisterCustomerMode}
                setNewCustomerId={setNewCustomerId}
              />
            </Card.Body>
            <Card.Header className="card-header">
              <div className="card-header-text customer-name">Vehicle</div>
              <div className="card-header-buttons">
                <CustomToggle
                  variant="primary"
                  eventKey="2"
                  createMode={registerVehicleMode}
                  setCreateMode={setRegisterVehicleMode}
                >
                  Create Vehicle
                </CustomToggle>
              </div>
            </Card.Header>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                <VehicleCardDetailed
                  vehicle={{ ...emptyVehicle, userId: newCustomerId }}
                  editMode={editMode}
                  setEditMode={setEditMode}
                  registerVehicleMode={registerVehicleMode}
                  setRegisterVehicleMode={setRegisterVehicleMode}
                  registerCustomerMode={registerCustomerMode}
                  setRegisterCustomerMode={setRegisterCustomerMode}
                  newCustomerId={newCustomerId}
                  setNewVehicle={setNewVehicle}
                />
              </Card.Body>
            </Accordion.Collapse>
            <Card.Header className="card-header">
              <div className="card-header-text customer-name">Visit</div>
              <div className="card-header-buttons">
                <CustomToggle
                  variant="primary"
                  eventKey="3"
                  createMode={registerVisitMode}
                  setCreateMode={setRegisterVisitMode}
                >
                  Create Visit
                </CustomToggle>
              </div>
            </Card.Header>
            <Accordion.Collapse eventKey="3">
              <Card.Body>
                <VisitCardDetailed
                  newVisit={{ ...emptyVisit, ...customer, ...newVehicle }}
                  carSegment={newVehicle.carSegment}
                  newVehicle={newVehicle}
                  editMode={editMode}
                  setEditMode={setEditMode}
                  allCurrencies={allCurrencies}
                  registerVisitMode={registerVisitMode}
                  setRegisterVisitMode={setRegisterVisitMode}
                  setRegisterVehicleMode={setRegisterVehicleMode}
                  setCreated={setCreated}
                />
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </>
    );
  }
  console.log(
    registerVehicleMode, 'vehicle'
  );
  return (
    !isDeleted && (
      <>
        <Accordion>
          <Card key={customer.userId}>
            <Card.Header className="card-header">
              <div className="card-header-text customer-name">{customer.fullName}</div>
              <div className="card-header-buttons">
                <CustomToggle
                  variant="primary"
                  eventKey="3"
                  createMode={registerVehicleMode}
                  setCreateMode={setRegisterVehicleMode}
                >
                  Add Car
                </CustomToggle>
                <CustomToggle variant="primary" eventKey="1" customFunc={setEditMode}>
                  Details
                </CustomToggle>
                <CustomToggle variant="primary" eventKey="2" customFunc={setEditMode}>
                  Car List
                </CustomToggle>
                <DeleteButtonWithPopover handleDeleteButton={handleDeleteButton} />
              </div>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <CustomerCardDetailed
                  key={customer.userId}
                  customer={customer}
                  editMode={editMode}
                  setEditMode={setEditMode}
                  registerCustomerMode={registerCustomerMode}
                  setRegisterCustomerMode={setRegisterCustomerMode}
                />
              </Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                {data.length ? <ul>{vehiclesListToShow}</ul> : <h2> No vehicles found on this customer </h2>}
              </Card.Body>
            </Accordion.Collapse>
            {/* {registerVehicleMode && (
              <Card.Body>
                <VehicleCard
                  // key={vehicle.vehicleId}
                  vehicle={emptyVehicle}
                  registerVehicleMode={registerVehicleMode}
                  setRegisterVehicleMode={setRegisterVehicleMode}
                  setVehicleList={setData}
                  vehicleList={data}
                  />
                  </Card.Body>
                )} */}
            {registerVehicleMode && (
              <Accordion.Collapse eventKey="3">
                <Card.Body>
                  <VehicleCard
                    vehicle={{ ...emptyVehicle, userId: customer.userId || newCustomerId }}
                    newVisit={{ ...emptyVisit, ...customer, ...newVehicle }}
                    newCustomerId={newCustomerId || customer.userId}
                    setVehicleList={setData}
                    vehicleList={data}
                    allCurrencies={allCurrencies}
                    registerVehicleMode={registerVehicleMode}
                    // setRegisterVehicleMode={setRegisterVehicleMode}
                    // registerCustomerMode={registerCustomerMode}
                    setRegisterCustomerMode={setRegisterCustomerMode}
                    registerVisitMode={registerVisitMode}
                    setRegisterVisitMode={setRegisterVisitMode}
                    setNewVehicle={setNewVehicle}
                  />
                  <Accordion>
                    <Card key={customer.userId}>
                      <Card.Header className="card-header">
                        <div className="register-header card-header-text">Register New Visit</div>
                        <CustomToggle
                          variant="primary"
                          eventKey="1"
                          createMode={registerVisitMode}
                          setCreateMode={setRegisterVisitMode}
                          disabled={!newVehicle.carSegment}
                        >
                          Add Visit
                        </CustomToggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          {registerVisitMode && (
                            <VisitCardDetailed
                              // key={visit.visitId}
                              // visitId={visit.visitId}
                              newVisit={{ ...emptyVisit, ...customer, ...newVehicle }}
                              carSegment={newVehicle.carSegment}
                              newVehicle={newVehicle}
                              editMode={editMode}
                              setEditMode={setEditMode}
                              allCurrencies={allCurrencies}
                              registerVisitMode={registerVisitMode}
                              setRegisterVisitMode={setRegisterVisitMode}
                              setRegisterVehicleMode={setRegisterVehicleMode}
                              setVisitList={setData}
                              visitList={data}
                              setCreated={setCreated}
                            />
                          )}
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </Card.Body>
              </Accordion.Collapse>
            )}
          </Card>
        </Accordion>
      </>
    )
  );
};

CustomerCard.defaultProps = {
  fullName: '',
  firstName: '',
  lastName: '',
  companyName: '',
  street: '',
  visitEnd: '',
  phone: '',
  email: '',
  city: '',
  country: '',
  postalCode: '',
  streetAddress: '',
  role: '',
  licensePlate: '',
  manufacturer: '',
  modelId: null,
  userId: null,
  modelName: '',
  vehicleId: null,
  vin: '',
  visitId: null,
  visitStart: '',
  visitStatus: ''
};

CustomerCard.propTypes = {
  customer: PropTypes.shape({
    userId: PropTypes.number,
    fullName: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    companyName: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    postalCode: PropTypes.number,
    streetAddress: PropTypes.string,
    licensePlate: PropTypes.string,
    manufacturer: PropTypes.string,
    modelId: PropTypes.number,
    modelName: PropTypes.string,
    vehicleId: PropTypes.number,
    vin: PropTypes.string,
    visitEnd: PropTypes.string,
    visitId: PropTypes.number,
    visitStart: PropTypes.string,
    visitStatus: PropTypes.string,
    role: PropTypes.string
  }).isRequired,
  registerCustomerMode: PropTypes.bool.isRequired,
  setRegisterCustomerMode: PropTypes.func.isRequired,
  allCurrencies: PropTypes.array.isRequired,
  setCreated: PropTypes.func.isRequired
};

export default CustomerCard;
