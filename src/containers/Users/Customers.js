// import { Form } from 'react-bootstrap';
import {
  // useHistory,
  useLocation
} from 'react-router-dom';
// import Sort from '../../components/Sort/Sort';
// import Paging from '../../components/Paging/Paging';
import useHttp from '../../hooks/useHttp';
import PropTypes from 'prop-types';
import { BASE_URL } from '../../common/constants';
// import { useState } from 'react';
import CustomerCard from '../../components/Customers/CustomerCard';
import Loading from '../../components/UI/Loading';
import Card from 'react-bootstrap/Card';
import CreateCustomerCard from '../../components/Customers/CreateCustomerCard';
import CreateVehicleCard from '../../components/Vehicles.js/CreateVehicleCard';
const Customers = ({ createCustomerMode, setCreateCustomerMode }) => {
  // const user = getUser();
  // const history = useHistory();
  const { search: query } = useLocation();
  const {
    data,
    // setLocalData,
    loading
    // error
  } = useHttp(`${BASE_URL}/users${query}`, 'GET', []);

  if (loading) {
    return <Loading />;
  }

  // if (error === '404') {
  //   history.push('*');
  // } else if (error) {
  //   history.push('/serviceUnavailable');
  // }

  // console.log(data);
  const customersListToShow = (
    <div className="customer-list">
      {data.map((customer) => {
        return <CustomerCard className="customer-card" key={customer.userId} customer={customer} />;
      })}
    </div>
  );

  return (
    <main>
      <div className="container-inner">
        <div className="customers-container-header">
          {/* <Form className="sorting">
            <div>Sorting Options</div>
            <Sort resource="/customers" />
          </Form> */}
          {/* {user.role === 'employee' && (
            <Button
              className="create-customer-btn btn-success"
              onClick={() => history.push('/users/create')}
            >
              Create customer
            </Button>
          )} */}
        </div>
        {createCustomerMode && (
          <Card>
            <Card.Header className="card-header">
              <div className="card-header-text">Register New Customer</div>
            </Card.Header>
            <Card.Body>
              <CreateCustomerCard setCreateCustomerMode={setCreateCustomerMode} createCustomerMode={createCustomerMode} />
            </Card.Body>
            <Card.Header className="card-header">
              <div className="card-header-text ">Create New Car</div>
            </Card.Header>
            <Card.Body>
              <CreateVehicleCard />
            </Card.Body>
          </Card>
        )}
        {data.length ? <ul>{customersListToShow}</ul> : <h2> No customers are found... </h2>}
        {/* <div id="paging-customers">
          <Paging resource="/customers" />
        </div> */}
      </div>
    </main>
  );
};

Customers.defaultProps = {
  createCustomerMode: false
};

Customers.propTypes = {
  createCustomerMode: PropTypes.bool.isRequired,
  setCreateCustomerMode: PropTypes.func.isRequired
};

export default Customers;