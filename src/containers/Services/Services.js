// import { Form } from 'react-bootstrap';
// import Sort from '../../components/Sort/Sort';
// import Paging from '../../components/Paging/Paging';
import useHttp from '../../hooks/useHttp';
import PropTypes from 'prop-types';
import { BASE_URL } from '../../common/constants';
// import { useState } from 'react';
import ServiceCard from '../../components/Services/ServiceCard';
import CreateServiceCard from '../../components/Services/CreateServiceCard';
import Loading from '../../components/UI/Loading';

const Services = ({ createServiceMode, setCreateServiceMode, servicesQuery }) => {
  const {
    data,
    // setLocalData,
    loading
    // error
  } = useHttp(`${BASE_URL}/services${servicesQuery}`, 'GET', [], [servicesQuery]);

  if (loading) {
    return <Loading />;
  }

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
        </div>
        {createServiceMode && <CreateServiceCard setCreateServiceMode={setCreateServiceMode} />}
        {data.length ? <ul>{servicesListToShow}</ul> : <h2> No services are found... </h2>}
        {/* <div id="paging-services">
          <Paging resource="/services" />
        </div> */}
      </div>
    </main>
  );
};

Services.defaultProps = {
  createServiceMode: false
};

Services.propTypes = {
  createServiceMode: PropTypes.bool.isRequired,
  setCreateServiceMode: PropTypes.func.isRequired,
  servicesQuery: PropTypes.string.isRequired
};

export default Services;
