// import { Form } from 'react-bootstrap';
// import {
//   // useHistory,
//   useLocation
// } from 'react-router-dom';
// import Sort from '../../components/Sort/Sort';
// import Paging from '../../components/Paging/Paging';
import useHttp from '../../hooks/useHttp';
import { BASE_URL } from '../../common/constants';
// import { useState } from 'react';
import CustomerCard from '../../components/Customers/CustomerCard';
// import Loading from '../../components/UI/Loading';

const Services = () => {
  const {
    data
    // setLocalData,
    // loading
    // error
  } = useHttp(`${BASE_URL}/services`, 'GET', []);

  // if (loading) {
  //   return <Loading />;
  // }

  // if (error === '404') {
  //   history.push('*');
  // } else if (error) {
  //   history.push('/serviceUnavailable');
  // }

  const servicessListToShow = (
    <div className="services-list">
      {data.map((services) => {
        return (
          <CustomerCard
            className="customer-card"
            key={services.serviceId}
            service={services}
          />
        );
      })}
    </div>
  );

  return (
    <main>
      <div className="services-container-inner">
        <div className="services-container-header">
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
        {data.length
          ? (
          <ul>{servicessListToShow}</ul>
            )
          : (
          <h2> No customers are found... </h2>
            )}
        {/* <div id="paging-customers">
          <Paging resource="/customers" />
        </div> */}
      </div>
    </main>
  );
};

export default Services;
