// import { Form } from 'react-bootstrap';
// import Sort from '../../components/Sort/Sort';
// import Paging from '../../components/Paging/Paging';
import useHttp from '../../hooks/useHttp';
import PropTypes from 'prop-types';
import { BASE_URL } from '../../common/constants';
// import { useState } from 'react';
import PartCard from '../../components/Parts/PartCard';
import CreatePartCard from '../../components/Parts/CreatePartCard';
// import Loading from '../../components/UI/Loading';

const Parts = ({ createPartMode, setCreatePartMode }) => {
  const {
    data
    // setLocalData,
    // loading
    // error
  } = useHttp(`${BASE_URL}/parts`, 'GET', []);

  // if (loading) {
  //   return <Loading />;
  // }

  // if (error === '404') {
  //   history.push('*');
  // } else if (error) {
  //   history.push('/serviceUnavailable');
  // }

  const partsListToShow = (
    <div className="parts-list">
      {data.map((parts) => {
        return <PartCard className="part-card" key={parts.partId} part={parts} />;
      })}
    </div>
  );

  return (
    <main>
      <div className="container-inner">
        <div className="parts-container-header">
          {/* <Form className="sorting">
            <div>Sorting Options</div>
            <Sort resource="/parts" />
          </Form> */}

        </div>
        {createPartMode && <CreatePartCard setCreatePartMode={setCreatePartMode} />}
        {data.length ? <ul>{partsListToShow}</ul> : <h2> No parts are found... </h2>}
        {/* <div id="paging-parts">
          <Paging resource="/parts" />
        </div> */}
      </div>
    </main>
  );
};

Parts.defaultProps = {
  createPartMode: false
};

Parts.propTypes = {
  createPartMode: PropTypes.bool.isRequired,
  setCreatePartMode: PropTypes.func.isRequired
};

export default Parts;
