// import { Form } from 'react-bootstrap';
// import Sort from '../../components/Sort/Sort';
// import Paging from '../../components/Paging/Paging';
import useHttp from '../../hooks/useHttp';
import { BASE_URL } from '../../common/constants';
// import { useState } from 'react';
import ServiceCard from '../../components/Services/ServiceCard';
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

  const servicesListToShow = (
    <div className="services-list">
      {data.map((services) => {
        return (
          <ServiceCard
            className="service-card"
            key={services.serviceId}
            service={services}
          />
        );
      })}
    </div>
  );

  return (
    <main>
      <div className="container-inner">
        <div className="services-container-header">
          {/* <Form className="sorting">
            <div>Sorting Options</div>
            <Sort resource="/services" />
          </Form> */}
          {/* {user.role === 'employee' && (
            <Button
              className="create-service-btn btn-success"
              onClick={() => history.push('/users/create')}
            >
              Create service
            </Button>
          )} */}
        </div>
        {data.length
          ? (
          <ul>{servicesListToShow}</ul>
            )
          : (
          <h2> No services are found... </h2>
            )}
        {/* <div id="paging-services">
          <Paging resource="/services" />
        </div> */}
      </div>
    </main>
  );
};

export default Services;
