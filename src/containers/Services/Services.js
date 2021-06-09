import useHttp from '../../hooks/useHttp';
import PropTypes from 'prop-types';
import { BASE_URL, defaultPageQuery } from '../../common/constants';
import ServiceCard from '../../components/Services/ServiceCard';
import CreateServiceCard from '../../components/Services/CreateServiceCard';
import Loading from '../../components/UI/Loading';
import Paging from '../../components/Paging/Paging';
import { useState } from 'react';

const Services = ({ createServiceMode, setCreateServiceMode, servicesQuery }) => {
  const [pagingQuery, setPagingQuery] = useState(defaultPageQuery);
  const updatePagingQuery = (prop, value) => setPagingQuery({ ...pagingQuery, [prop]: value });

  const { data, loading } = useHttp(`${BASE_URL}/services${servicesQuery}&page=${pagingQuery.page}&pageSize=${pagingQuery.pageSize}`,
    'GET', [], [servicesQuery, pagingQuery]);

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
      <div className="container-inner services">
        <div className="services-container-header">
        </div>
        {createServiceMode && <CreateServiceCard setCreateServiceMode={setCreateServiceMode} />}
        {data.length ? <ul>{servicesListToShow}</ul> : <h2> No services are found... </h2>}
        <Paging
          updatePagingQuery={updatePagingQuery}
          resource={'services'}
          pagingQuery={pagingQuery}
        />
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
