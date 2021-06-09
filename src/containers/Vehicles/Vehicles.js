import useHttp from '../../hooks/useHttp';
import { BASE_URL, defaultPageQuery } from '../../common/constants';
import Loading from '../../components/UI/Loading';
import VehicleCard from '../../components/Vehicles.js/VehicleCard';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Paging from '../../components/Paging/Paging';

const Vehicles = ({ allCurrencies, vehiclesQuery }) => {
  const [pagingQuery, setPagingQuery] = useState(defaultPageQuery);
  const updatePagingQuery = (prop, value) => setPagingQuery({ ...pagingQuery, [prop]: value });

  const [registerVisitMode, setRegisterVisitMode] = useState(false);
  const [created, setCreated] = useState(false);

  const { data, loading } = useHttp(`${BASE_URL}/vehicles${vehiclesQuery}&page=${pagingQuery.page}&pageSize=${pagingQuery.pageSize}`,
    'GET', [], [vehiclesQuery, created, pagingQuery]);

  if (loading) {
    return <Loading />;
  }

  // if (error === '404') {
  //   history.push('*');
  // } else if (error) {
  //   history.push('/serviceUnavailable');
  // }

  const vehiclesListToShow = (
    <div className="vehicle-list">
      {data.map((vehicle) => {
        return (
          <VehicleCard
            className="vehicle-card"
            key={vehicle.vehicleId}
            vehicle={vehicle}
            allCurrencies={allCurrencies}
            registerVisitMode={registerVisitMode}
            setRegisterVisitMode={setRegisterVisitMode}
            setCreated={setCreated}
          />
        );
      })}
    </div>
  );

  return (
    <main>
      <div className="container-inner">
        <div className="vehicles-container-header">
        </div>
        {data.length
          ? (
          <ul>{vehiclesListToShow}</ul>
            )
          : (
          <h2> No vehicles are found... </h2>
            )}
        <Paging
          updatePagingQuery={updatePagingQuery}
          resource={'vehicles'}
          pagingQuery={pagingQuery}
        />
      </div>
    </main>
  );
};

Vehicles.propTypes = {
  allCurrencies: PropTypes.array.isRequired,
  vehiclesQuery: PropTypes.string.isRequired
};

export default Vehicles;
