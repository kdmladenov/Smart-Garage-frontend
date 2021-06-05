import useHttp from '../../hooks/useHttp';
import { BASE_URL } from '../../common/constants';
// import { useState } from 'react';
import Loading from '../../components/UI/Loading';
// import { useState } from 'react';
import VehicleCard from '../../components/Vehicles.js/VehicleCard';
import PropTypes from 'prop-types';

const Vehicles = ({ allCurrencies, vehiclesQuery }) => {
  const {
    data,
    // setLocalData,
    loading
    // error
  } = useHttp(`${BASE_URL}/vehicles${vehiclesQuery}`, 'GET', [], [vehiclesQuery]);

  if (loading) {
    return <Loading />;
  }

  // if (error === '404') {
  //   history.push('*');
  // } else if (error) {
  //   history.push('/serviceUnavailable');
  // }

  // console.log(data);
  const vehiclesListToShow = (
    <div className="vehicle-list">
      {data.map((vehicle) => {
        return (
          <VehicleCard
            className="vehicle-card"
            key={vehicle.vehicleId}
            vehicle={vehicle}
            allCurrencies={allCurrencies}
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
        {/* <div id="paging-vehicles">
          <Paging resource="/vehicles" />
        </div> */}
      </div>
    </main>
  );
};

Vehicles.propTypes = {
  allCurrencies: PropTypes.array.isRequired,
  vehiclesQuery: PropTypes.string.isRequired
};

export default Vehicles;
