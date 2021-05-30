// import { Form } from 'react-bootstrap';
// import Sort from '../../components/Sort/Sort';
// import Paging from '../../components/Paging/Paging';
import useHttp from '../../hooks/useHttp';
import { BASE_URL } from '../../common/constants';
// import { useState } from 'react';
import PartCard from '../../components/Parts/PartCard';
// import Loading from '../../components/UI/Loading';

const Parts = () => {
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
        return (
          <PartCard
            className="part-card"
            key={parts.partId}
            part={parts}
          />
        );
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
          {/* {user.role === 'employee' && (
            <Button
              className="create-part-btn btn-success"
              onClick={() => history.push('/users/create')}
            >
              Create part
            </Button>
          )} */}
        </div>
        {data.length
          ? (
          <ul>{partsListToShow}</ul>
            )
          : (
          <h2> No parts are found... </h2>
            )}
        {/* <div id="paging-parts">
          <Paging resource="/parts" />
        </div> */}
      </div>
    </main>
  );
};

export default Parts;
